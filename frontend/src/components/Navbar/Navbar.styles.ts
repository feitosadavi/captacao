import { styled } from '../../config/stitches'
import {Link} from 'react-router-dom'


export const Wrapper = styled('div', {
  alignSelf: 'center',

  display: 'flex',
  flexDirection: 'column',
  gap: '$2',

  width: '30px',
  height: '100%',
  padding: '$1',
  marginLeft: '5px',
  borderRadius: '$1',
  background: '$mauve3',
})

export const NavLink = styled(Link, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '$1',
  background: '$mauve6',
  boxShadow: '$2',
  padding: '$1',
  width: '20px',
  height: '20px',
  cursor: 'pointer',

  '&:hover': {
    background: '$mauve7'
  }
})