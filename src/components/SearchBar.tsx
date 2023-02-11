'use client';

// import Paper from '@mui/material/Paper';
// import InputBase from '@mui/material/InputBase';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';

import { BsSearch as SearchIcon } from 'react-icons/bs';
import { styled } from '@stitches/react';
import { MagnifyingGlass } from 'react-loader-spinner';

interface ISearchBar {
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onClick: () => void
  loading: boolean
}

export const SearchBar: React.FC<ISearchBar> = ({ value, onChange, onClick, loading }) => {
  return (
    <S.Wrapper>
      <S.Input
        value={value}
        onChange={onChange}
        placeholder="O que você deseja buscar?"
      />

      {
        loading
          ? <MagnifyingGlass
            visible={true}
            height="35"
            width="35"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor='#3b3e3f'
            color='#e4e4e4'
          />
          : <S.Button onClick={onClick}>
            <SearchIcon color='white' />
          </S.Button>
      }
    </S.Wrapper>
  )
}

const S = {
  Wrapper: styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '35px',
    background: '$mauve7',
    borderRadius: '$1',
    boxShadow: '$2',

    '&:hover': {
      background: '$mauve8',
    },
  }),
  Input: styled('input', {
    all: 'unset',
    width: '100%',
    height: '100%',
    color: '$mauve12',
    padding: '$1',
  }),
  Button: styled('button', {
    all: 'unset',
    cursor: 'pointer',
    padding: '$1',
    '&:hover': {
      background: '$mauve7',
      borderRadius: '10rem'
    },
    marginRight: '5px'
  })
}
