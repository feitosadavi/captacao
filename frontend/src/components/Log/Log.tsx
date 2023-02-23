import { NewTarget } from '@/pages/search.page'
import React from 'react'
import { BsArrowRight as BsArrowRightIcon } from 'react-icons/bs'

import { ConsoleMessage, Target, TargetKeys } from '../../types'
import { Button } from '../Button'
import { ToggleGroup } from '../ToggleGroup'

import * as S from './Log.styles'

interface ILogProps {
  logMessages: ConsoleMessage[],
  setLogMessages: React.Dispatch<React.SetStateAction<ConsoleMessage[]>>
  targets: NewTarget[]
  // handleTargetChange: (selectedTargets: TargetKeys[]) => void
  handleTargetChange: (selectedTargets: TargetKeys) => void
}

export const Log: React.FC<ILogProps> = ({
  logMessages,
  setLogMessages,
  targets,
  handleTargetChange
}) => {

  const handleClick = (url: string) => {
    console.log(url);
    // window.eval(`window.location.replace('your.url')`);
    // window.open(url, '_blank')
  }

  return (
    <S.Container>
      <S.Wrapper>
        {
          logMessages.map(({ description, type, targetName }, i) => (
            <S.LogMessageWrapper key={`${targetName}-${i}`}>
              <BsArrowRightIcon color='white' />

              <S.LogMessage onClick={() => handleClick(description)} variant={type}>
                <img src={`/${targetName}-logo.png`} width='25' height='13' alt={`${targetName} logo`} />
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

        <ToggleGroup
          items={targets.map(target => target.name)}
          selected={targets.filter(target => target.selected)[0].name}
          onChange={handleTargetChange}
        />
      </S.ToolBar>
    </S.Container>
  )
}
