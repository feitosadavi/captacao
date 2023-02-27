import { BsPower } from 'react-icons/bs'
import { BotStatus } from '../pages/search.page'
import { styled } from '../config/stitches'
import { Button } from './Button'

interface BotStatusManagerProps {
  botStatus: BotStatus
  handlePowerSwitch: () => void
  SearchModal: JSX.Element
  handleStart?: () => void
}

export const BotStatusManager: React.FC<BotStatusManagerProps> = ({
  botStatus,
  handlePowerSwitch,
  SearchModal,
  handleStart
}) => {
  return (
    <S.Wrapper>

      <S.BotMascot>
        {SearchModal}
      </S.BotMascot>

      <S.BotManager>
        <S.Status status={botStatus}>
          &bull;
          {botStatus === 'busy' ? 'pesquisando' : botStatus}
        </S.Status>

         <S.PowerButton onClick={handlePowerSwitch} status={botStatus}>
          <BsPower />
        </S.PowerButton>

        {/* <Button label="Parar" onClick={handlePowerSwitch} />
        <Button label="Parar" onClick={handleStart} /> */}
      </S.BotManager>

    </S.Wrapper>
  )
}

export const S = {
  Wrapper: styled('div', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '250px',
    height: '100px',
    background: '$mauve4',
    borderRadius: '$1',
    boxShadow: '$1'
  }),
  BotMascot: styled('div', {
    width: '50%'
  }),
  BotManager: styled('div', {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '$2'
  }),
  Status: styled('span', {
    fontWeight: '$bolder',
    verticalAlign: 'middle',
    transition: '.5s',
    variants: {
      status: {
        online: {
          color: '#38db06'
        },
        offline: {
          color: '#e00d0d'
        },
        busy: {
          color: '#094bda'
        }
      }
    }
  }),
  PowerButton: styled('button', {
    all: 'unset',
    cursor: 'pointer',
    width: '45px',
    height: '45px',
    fontSize: '45px',
    background: '$mauve6',
    borderRadius: '$full',
    textAlign: 'center',
    padding: '$2',
    transition: '.5s',
    '&:hover': {
      background: '$mauve8',
    },
    variants: {
      status: {
        online: { color: '#38db06' },
        offline: { color: '#e00d0d' },
        busy: {
          color: '#094bda'
        }
      }
    }
  })
}