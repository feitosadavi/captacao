import React from 'react'

// import Button from '@mui/material/Button';
import { BsArrowRight as BsArrowRightIcon } from 'react-icons/bs'


import * as S from './Log.styles'
// import { LogMessageType } from 'backend/olx/main';

type LogMessageType = any

interface ILogProps {
  logMessages: LogMessageType[],
  setLogMessages: React.Dispatch<React.SetStateAction<LogMessageType[]>>
  handleStop: () => any
}

export const Log: React.FC<ILogProps> = ({ logMessages, setLogMessages, handleStop }) => {

  return (
    <S.Container>
      <S.Wrapper>
        {
          logMessages.map(({ label, description, type }, i) => (
            <S.LogMessage key={`${label}${i}`} variant={type}>
              {/* <Image src={`/${label}-logo.png`} width='25' height='13' alt={`${label} logo`} /> */}
              <BsArrowRightIcon color='white' />
              {description}
            </S.LogMessage>
          ))
        }
      </S.Wrapper>
      <S.ToolBar>
        <button onClick={() => setLogMessages([])} color='warning'>Limpar</button>
        <button onClick={handleStop} color='error'>Parar</button>
      </S.ToolBar>
    </S.Container>
  )
}
