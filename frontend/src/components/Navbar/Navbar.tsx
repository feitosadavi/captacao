'use client'

import React from 'react'

import * as S from './Navbar.styles'

import { BsSearch as BsSearchIcon, BsMenuUp as BsMenuUpIcon } from 'react-icons/bs'

type NavItems = {
  thumb: any
  path: string
}

const navItems: NavItems[] = [{
  thumb: <BsSearchIcon color='white' />,
  path: '/'
}]

export const Navbar: React.FC = () => {
  // const navigate = useNavigate();
  return (
    <S.Wrapper>
      {
        navItems.map(({ thumb, path }) => (
          <S.NavLink key={path} to={path} >
            {thumb}
          </S.NavLink>
        ))
      }
    </S.Wrapper>
  )
}