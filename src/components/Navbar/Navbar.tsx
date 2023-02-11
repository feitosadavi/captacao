'use client'

import React from 'react'

import * as S from './Navbar.styles'

import { OlxLogo } from '../OlxLogo'
import { BsSearch as BsSearchIcon } from 'react-icons/bs'
import { useHref } from 'react-router-dom'

type NavItems = {
  thumb: any
  path: string
}

const navItems: NavItems[] = [{
  thumb: <BsSearchIcon color='white' />,
  path: '/search'
}]

export const Navbar: React.FC = () => {
  // const navigation = useHref(path)


  const handleClick = () => {

  }


  return (
    <S.Wrapper>
      {
        navItems.map(({ thumb, path }) => (
          <S.NavLink key={path} onClick={() => useHref(path)}>
            {thumb}
          </S.NavLink>
        ))
      }
    </S.Wrapper>
  )
}