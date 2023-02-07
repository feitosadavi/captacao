import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import * as S from './App.styles'
import { SearchBar, ProgressBar, Log } from './components'
import "./App.css";
import { ProgressMessageType, StackMessageType } from 'backend/domain/logger.protocols';
import { runWebWorkerSync } from './workers/runWebWorkerSync';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';


function App () {
  const [socket, setSocket] = React.useState<Socket<DefaultEventsMap, DefaultEventsMap>>()
  async function handleStart () {
    await invoke("start");
  }

  async function handleStop () {
    socket?.disconnect()
    await invoke("stop");
  }


  const [searchValue, setSearchValue] = React.useState<string>('Fiat uno mille 2015')

  const [logMessages, setLogMessages] = React.useState<StackMessageType[]>([])

  const [progress, setProgress] = React.useState<ProgressMessageType>({ current: 0, total: 0 });

  const [error, setError] = React.useState<string>('')

  const [isBotOnline, setIsBotOnline] = React.useState<boolean>(false)


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
  }

  const connectSocket = () => new Promise((resolve, rejects) => {
    try {
      if (isBotOnline) {
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
    if (isFirstMount.current) {
      runWebWorkerSync({
        name: 'BotStatusCheckerWorker',
        data: { query: searchValue },
        onMessage (logMsg) {
          console.log(logMsg);
          setIntervalMsg(prevState => prevState + 1)
          setIsBotOnline(logMsg)
        }
      })
      isFirstMount.current = false
    }

    connectSocket()
      .catch((err) => setError(err.msg))


    // return () => { socket?.disconnect() }
  }, [isBotOnline])


  const [intervalMsg, setIntervalMsg] = React.useState<number>(1)

  const handleSearchClick = async () => {
    // await connectSocket()
    console.log({ socket });

    setProgress({ current: 0, total: 0 })
    socket?.emit('search', searchValue)
  }

  return (
    <S.Wrapper>
      <SearchBar
        value={searchValue}
        onChange={handleSearchChange}
        onClick={handleSearchClick}
      />

      <div>O bot está {isBotOnline ? 'online' : 'offline'}</div>
      <button onClick={() => setError('')}>Limpar error</button>
      <div>Intervalo {intervalMsg}</div>
      <div>{error && error}</div>

      <ProgressBar icon='olx' progress={progress.current} total={progress.total} />
      <button type="button" onClick={() => handleSearchClick()}>
        Search
      </button>
      <button type="button" onClick={() => handleStart()}>
          Iniciar
      </button>
      <Log
        setLogMessages={setLogMessages}
        logMessages={logMessages}
        handleStop={handleStop}
      />
    </S.Wrapper>
  );
}

export default App;
