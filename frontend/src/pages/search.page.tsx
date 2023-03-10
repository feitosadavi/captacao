import React from "react";
import { io } from 'socket.io-client';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

import { invoke } from "@tauri-apps/api/tauri";

import { runWebWorkerSync } from '../workers/runWebWorkerSync';
import { ProgressBar, Log, BotStatusManager, Modal } from '../components'
import * as S from './search.styles'
import { ConsoleMessage, Progress, TargetKeys, TargetOptions } from '../types';

type LogMessageType = any
type ProgressMessageType = any

export type BotStatus = 'online' | 'offline' | 'busy'

export type NewTarget = TargetOptions & { name: TargetKeys }

const initialTargets: NewTarget[] = [{
  name: 'olx',
  progress: { current: 0, total: 0 },
  selected: true
}]

type Action = {
  type: 'TOGGLE_SELECTED' | 'CHANGE_PROGRESS',
  // selectedTargets?: TargetKeys[],
  selectedTargets?: TargetKeys,
  progress?: Progress
}

const reducer: React.Reducer<NewTarget[], Action> = (state, { type, selectedTargets, progress }) => {
  switch (type) {
    case 'TOGGLE_SELECTED':
      return state.map(target => {
        // target.selected = selectedTargets?.includes(target.name) ?? false
        target.selected = selectedTargets === target.name
        return target
      })
    case 'CHANGE_PROGRESS':
      return state.map(target => {
        if (selectedTargets?.includes(target.name) && progress) {
          target.progress.current = progress?.current ?? target.progress.current
          target.progress.total = progress?.total ?? target.progress.total
        }
        return target
      })
    default:
      return state
  }
}

type SearchParams = {
  brand: string
  model: string
  state: string
  message: string
}

type FilterInput = {
  label: string
  id: keyof SearchParams
  value: any
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function () {
  const [socket, setSocket] = React.useState<Socket<DefaultEventsMap, DefaultEventsMap>>()
  const [searchParams, setSearchParams] = React.useState<SearchParams>({ brand: '', model: '', state: '', message: '' })
  const [logMessages, setLogMessages] = React.useState<ConsoleMessage[]>([])
  const [error, setError] = React.useState<string>('')
  const [botStatus, setBotStatus] = React.useState<BotStatus>('offline')

  const [targets, dispatchTargets] = React.useReducer(reducer, initialTargets)

  const connectSocket = () => new Promise((resolve, rejects) => {
    try {
      // if (botStatus !== 'offline') {
        const _socket = io('http://localhost:5000')
        setSocket(_socket as any)
        resolve(null)
      // } else {
      //   rejects(new Error('O bot est?? offline, clique em "Iniciar" e tente novamente!'))
      // }
    } catch (error) {
      console.error(error);
      rejects(new Error('Erro ao conectar-se com o servidor'))
    }
  })

  const [loops, setLoops] = React.useState(0)
  const isFirstMount = React.useRef<boolean>(true)
  React.useEffect(() => {
    if (isFirstMount.current) {
      runWebWorkerSync({
        name: 'BotStatusCheckerWorker',
        onMessage (logMsg) {
          // setBotStatus(logMsg)
          setLoops(prevState => prevState++)
        }
      })
      isFirstMount.current = false
    }

    connectSocket().catch((err) => setError(err.msg))
  }, [botStatus])

  function isProcessFinished ({ current, total }: Progress) {
    return (current !== 0 && total !== 0) && (current === total)
  }

  React.useEffect(() => {
    const finished = targets
      .filter(target => target.selected)
      .every(target => isProcessFinished(target.progress))

    finished && fetch('http://localhost:5000/is-not-busy')
  }, [targets])


  React.useEffect(() => {
    socket?.on('log', ({ type, content, target }: LogMessageType) => {
      if (type === 'progress') {
        const { current, total } = content as ProgressMessageType
        const progress = { current, total }
        dispatchTargets({ type: 'CHANGE_PROGRESS', progress, selectedTargets: target })
      } else if (type === 'stack') {
        setLogMessages(prevState => ([...prevState, { ...content, targetName: target } as ConsoleMessage]))
      }
    })

  }, [socket])

  async function handleStart () {
    await invoke("start");
    setBotStatus('online');
  }

  async function handleStop () {
    socket?.disconnect()
    fetch('http://localhost:5000/stop')
    setBotStatus('offline');
  }

  async function handlePowerSwitch () {
    botStatus === 'offline' ? handleStart() : handleStop()
  }

  async function handleSearchSubmit () {
    if (botStatus === 'online') {
      const progress = { current: 0, total: 0 }
      const selectedTargets = targets.filter(target => target.selected).map(target => target.name)[0]
      dispatchTargets({ type: 'CHANGE_PROGRESS', selectedTargets, progress })
      socket?.emit('search', { message: searchParams.message, query: searchParams, targets: targets.filter(target => target.selected).map(target => target.name) })
    } else {
      setError('O bot est?? offline, clique no bot??o para lig??-lo e tente novamente!')
    }
  }

  function handleTargetChange (selectedTargets: TargetKeys) {
    dispatchTargets({ type: 'TOGGLE_SELECTED', selectedTargets })
  }

  function handleSearchParamsChange (value: any, param: keyof SearchParams) {
    setSearchParams(prevState => ({ ...prevState, [param]: value }))
  }

  const filterInputs: FilterInput[] = [{
    id: 'brand',
    label: 'Marca',
    value: searchParams.brand,
    handleChange: ({ currentTarget: { value } }) => handleSearchParamsChange(value, 'brand')
  }, {
    id: 'model',
    label: 'Modelo',
    value: searchParams.model,
    handleChange: ({ currentTarget: { value } }) => handleSearchParamsChange(value, 'model')
  }, {
    id: 'state',
    label: 'Estado',
    value: searchParams.state,
    handleChange: ({ currentTarget: { value } }) => handleSearchParamsChange(value, 'state')
    }, {
      id: 'message',
      label: 'Mensagem',
      value: searchParams.message,
      handleChange: ({ currentTarget: { value } }) => handleSearchParamsChange(value, 'message')
  }]

  return (
    <S.Wrapper>
      <S.ControlPanel>
        {
          targets.map(({ selected, name, progress }) => (
            selected ?
              <ProgressBar
                key={name}
                icon={name}
                progress={progress.current}
                total={progress.total}
              />
              : null
          ))
        }
        <div>
          <BotStatusManager
            botStatus={botStatus}
            SearchModal={
              <Modal
                title='Pesquisar'
                description='Certifique-se de que a gram??tica dos campos est?? correta'
                buttonName='Pesquisar'
                closeBtnText='OK'
                onSubmit={handleSearchSubmit}
              >
                <>
                  {
                    filterInputs.map(({ id, label, value, handleChange }) => (
                      <S.Fieldset key={id}>
                        <S.Label htmlFor={id}>{label}</S.Label>
                        <S.Input
                          id={id}
                          defaultValue={value}
                          value={value}
                          onChange={handleChange}
                        />
                      </S.Fieldset>
                    ))
                  }
                </>
              </Modal>
            }
            handlePowerSwitch={handlePowerSwitch}
          />
        </div>
      </S.ControlPanel>



      <Log
        setLogMessages={setLogMessages}
        logMessages={logMessages}
        targets={targets}
        handleTargetChange={handleTargetChange}
      />
    </S.Wrapper>
  );
}