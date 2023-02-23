import { Button } from '../components'
import { styled } from '@stitches/react'
import { Input } from './search.styles'

import message from './message.json'
import React from 'react'

import { Repository } from 'typeorm'
import { Message } from '../../../backend/src/db/Message'

export default function () {
  const [contactRepository, setContactRepository] = React.useState<Repository<Message>>();
  const [message, setMessage] = React.useState<Message>()

  const init = async () => {
    // const res = await dataSource.initialize()

  }

  React.useEffect(() => {
    init()
    // dataSource.initialize().then(ds => {
    //   // const repo = ds.getRepository<Message>(Message)
    //   // setContactRepository(repo)

    //   // repo.find().then(res => {
    //   //   setMessage(res[0])
    //   // })
    // })
  }, [])

  const saveMessage = async () => {
    if (message) contactRepository?.update(message.id, { content: message.content })
  }

  const handleChange = (e: React.ChangeEvent) => {
    console.log(e);
  }

  return (
    <S.Wrapper>
      <S.Title>CONFIGURAR MENSAGEM</S.Title>
      <S.MessageBox>
        <Input value={message?.content} onChange={handleChange} />
        <Button label='Salvar' onClick={() => saveMessage()} />
      </S.MessageBox>
    </S.Wrapper>
  )
}

const S = {
  Wrapper: styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '$5',
    width: '100%',
  }),
  Title: styled('h1', {
    color: '$mauve11',
  }),
  MessageBox: styled('div', {
    display: 'flex',


    width: '90%',
    gap: '$3',
    // height: '30px',
  })
}