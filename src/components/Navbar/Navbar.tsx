'use client'

import React from 'react'

import * as S from './Navbar.styles'

import { OlxLogo } from '../OlxLogo'
import { BsSearch as BsSearchIcon } from 'react-icons/bs'

type NavItems = {
  thumb: any
  path: string
}

const navItems: NavItems[] = [{
  thumb: <BsSearchIcon color='white' />,
  path: '/search'
}, {
  thumb: 'Olx',
  path: '/olx'
}]


export const Navbar: React.FC = () => {
  return (
    <S.Wrapper>
      {
        navItems.map(({ thumb, path }) => (
          <S.NavLink key={path} to={path}>
            {thumb}
          </S.NavLink>
        ))
      }
    </S.Wrapper>
  )
}