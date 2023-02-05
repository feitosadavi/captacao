import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import * as S from './App.styles'
import { SearchBar, ProgressBar, Log } from './components'
import "./App.css";
import { LogMessageType, ProgressMessageType, StackMessageType } from 'backend/domain/logger.protocols';
import { io } from 'socket.io-client';
import useInterval from './Hooks/useInterval';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import EventEmitter from 'events';
import { runWorkerSync } from './workers/runWorkerSync';

function App() {
  const [name, setName] = useState("");

  async function handleStart() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    await invoke("start");
    // connectSocket()
  }

  async function handleStop() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    await invoke("stop");
  }

  // const [socket, setSocket] = React.useState<Socket<DefaultEventsMap, DefaultEventsMap>>()

  const [searchValue, setSearchValue] = React.useState<string>('Fiat uno mille 2015')

  const [logMessages, setLogMessages] = React.useState<StackMessageType[]>([])

  const [progress, setProgress] = React.useState<ProgressMessageType>({ current: 0, total: 0 });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
  }

  // const connectSocket = () => {
  //   try {
  //     const _socket = io('http://localhost:1200')
  //     setSocket(_socket as any)
  //   } catch (error) {
  //     console.log('erro ao conectar com socket');
      
  //   }
  // }

  // React.useEffect(() => {

      
  //   return () => {socket?.disconnect()}
  // }, [socket])


  // const [isBotOnline, setIsBotOnline] = React.useState<boolean>(false)
  // const [intervalMsg, setIntervalMsg] = React.useState<number>(1)

  // useInterval(async () => {
  //   try {
  //     const res = await (await fetch('http://localhost:1200/ping')).json()
  //     console.log(res);
        
  //     const msg: StackMessageType = {type: 'info', description: `foi ${res}`, label: 'interval'} 
  //     setLogMessages(prevState => ([...prevState, msg as StackMessageType]))
  //     setIsBotOnline(true)
  //   } catch (error) {
  //     setIsBotOnline(false)
  //     const msg: StackMessageType = {type: 'info', description: 'error', label: 'interval'} 
  //     setLogMessages(prevState => ([...prevState, msg as StackMessageType]))
  //   }
  //   setIntervalMsg((prevState) => prevState + 1)
  // }, 2000)

  // const eventManager = new EventEmitter()
  // eventManager.on('log', (message: LogMessageType) => {
  //   if (message.type === 'progress') setProgress(message.content as ProgressMessageType)
  //   else {
  //     setLogMessages(prevState => ([...prevState, message.content as StackMessageType]))
  //     setProgress(prevState => ({ ...prevState, current: prevState.current + 1 }))
  //   }
  // })
  const handleSearchClick = async () => {
    // console.log(searchValue);
    
    // setProgress({ current: 0, total: 0 })
    // console.log(socket);
    
    // socket?.emit('search', searchValue)
    try {
      runWorkerSync({
        name: 'BotStatusCheckerWorker',
        data: { query: searchValue },
        onMessage (logMsg) {
          setLogMessages(prevState => ([...prevState, { type: 'info', description: logMsg, label: 'test' } as StackMessageType]))
        }
        // onMessage: async (logMsg) => {
        // },
      })
    } catch (error) {
      console.error(error);

    }
  }

  return (
    <S.Wrapper>
      <SearchBar
        value={searchValue}
        onChange={handleSearchChange}
        onClick={handleSearchClick}
      />
{/* 
      <div>O bot está { isBotOnline ? 'online' : 'offline' }</div>
      <div>Intervalo {intervalMsg}</div> */}

      <ProgressBar icon='olx' progress={progress} />
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
