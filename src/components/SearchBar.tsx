'use client';

// import Paper from '@mui/material/Paper';
// import InputBase from '@mui/material/InputBase';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';

import { BsSearch as SearchIcon } from 'react-icons/bs';
import { styled } from '@stitches/react';

interface ISearchBar {
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onClick: () => void
}

export const SearchBar: React.FC<ISearchBar> = ({ value, onChange, onClick }) => {
  return (
    <S.Wrapper>
      search bar
      {/* <InputBase
        value={value}
        onChange={onChange}
        sx={{ ml: 1, flex: 1, color: 'white' }}
        placeholder="O que você deseja buscar?"
        inputProps={{ 'aria-label': 'search cars' }}
        fullWidth
      />
      <IconButton onClick={onClick} type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon color='white' />
      </IconButton> */}
    </S.Wrapper>
  )
}

const S = {
  Wrapper: styled('div', {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '35px',
    background: '$mauve7',
    px: '$2',
    borderRadius: '$1',
    boxShadow: '$2',
    margin: '0 0 0 0',

    '&:hover': {
      background: '$mauve8',
    },
  })
}
