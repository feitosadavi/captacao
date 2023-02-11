import React from 'react'

// import Button from '@mui/material/Button';
import { BsArrowRight as BsArrowRightIcon } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { Button } from '../Button'


import * as S from './Log.styles'
// import { LogMessageType } from 'backend/olx/main';

type LogMessageType = any

interface ILogProps {
  logMessages: LogMessageType[],
  setLogMessages: React.Dispatch<React.SetStateAction<LogMessageType[]>>
}

export const Log: React.FC<ILogProps> = ({ logMessages, setLogMessages }) => {

  return (
    <S.Container>
      <S.Wrapper>
        {
          logMessages.map(({ label, description, type }, i) => (
            <S.LogMessageWrapper>
              <BsArrowRightIcon color='white' />

              <S.LogMessage key={`${label}${i}`} variant={type}>
                {/* <Image src={`/${label}-logo.png`} width='25' height='13' alt={`${label} logo`} /> */}
                {/* <a */}
                {description}
              </S.LogMessage>
            </S.LogMessageWrapper>
          ))
        }
      </S.Wrapper>
      <S.ToolBar>
        <Button
          variant='violet'
          onClick={() => setLogMessages([])}
          label='LIMPAR'
        />
      </S.ToolBar>
    </S.Container>
  )
}
