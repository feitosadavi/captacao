import React from "react";
import { io } from 'socket.io-client';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { invoke } from "@tauri-apps/api/tauri";

import { LogMessageType, ProgressMessageType, StackMessageType } from 'backend/domain/logger.protocols';

import { runWebWorkerSync } from '../workers/runWebWorkerSync';
import { SearchBar, ProgressBar, Log, BotStatusManager } from '../components'
import * as S from './search.styles'

export type BotStatus = 'online' | 'offline' | 'busy'

export default function () {
  const [socket, setSocket] = React.useState<Socket<DefaultEventsMap, DefaultEventsMap>>()
  const [searchValue, setSearchValue] = React.useState<string>('FUSCA AZUL BOM')
  const [logMessages, setLogMessages] = React.useState<StackMessageType[]>([])
  const [progress, setProgress] = React.useState<ProgressMessageType>({ current: 0, total: 0 });
  const [error, setError] = React.useState<string>('')
  const [botStatus, setBotStatus] = React.useState<BotStatus>('offline')

  const connectSocket = () => new Promise((resolve, rejects) => {
    try {
      if (botStatus !== 'offline') {
        const _socket = io('http://localhost:5000')
        setSocket(_socket as any)
      } else {
        rejects(new Error('O bot está offline, clique em "Iniciar" e tente novamente!'))
      }
    } catch (error) {
      console.error(error);
      rejects(new Error('Erro ao conectar-se com o servidor'))
    }
  })

  const isFirstMount = React.useRef<boolean>(true)
  React.useEffect(() => {
    console.log({ botStatus })
    if (isFirstMount.current) {
      runWebWorkerSync({
        name: 'BotStatusCheckerWorker',
        data: { query: searchValue },
        onMessage (logMsg) {
          console.log(logMsg)
          setBotStatus(logMsg)
        }
      })
      isFirstMount.current = false
    }

    connectSocket().catch((err) => setError(err.msg))
  }, [botStatus])

  React.useEffect(() => {
    const { current, total } = progress
    if ((current !== 0 && total !== 0) && (progress.current === progress.total)) {
      fetch('http://localhost:5000/is-not-busy')
    }
  }, [progress])

  React.useEffect(() => {
    socket?.on('log', ({ type, content }: LogMessageType) => {
      console.log({ type, content });

      if (type === 'progress') {
        content as ProgressMessageType
        setProgress(({ current, total }) =>
        ({
          current: (content as ProgressMessageType).current || current,
          total: (content as ProgressMessageType).total || total
        })
        )
      } else if (type === 'stack') {
        setLogMessages(prevState => ([...prevState, content as StackMessageType]))
      }
    })

  }, [socket])

  async function handleStart () {
    await invoke("start");
  }

  async function handleStop () {
    socket?.disconnect()
    await invoke("stop");
  }

  async function handlePowerSwitch () {
    botStatus === 'offline' ? handleStart() : handleStop()
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
  }

  const handleSearchClick = async () => {
    if (botStatus === 'online') {
      setProgress({ current: 0, total: 0 })
      socket?.emit('search', searchValue)
    } else {
      setError('O bot está offline, clique no botão para ligá-lo e tente novamente!')
    }
  }

  return (
    <S.Wrapper>
      <SearchBar
        loading={botStatus === 'busy'}
        value={searchValue}
        onChange={handleSearchChange}
        onClick={handleSearchClick}
      />

      {/* {botStatus} */}

      <ProgressBar icon='olx' progress={progress.current} total={progress.total} />

      <BotStatusManager
        botStatus={botStatus}
        handlePowerSwitch={handlePowerSwitch}
      />

      <Log
        setLogMessages={setLogMessages}
        logMessages={logMessages}
      />
    </S.Wrapper>
  );
}