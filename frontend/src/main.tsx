import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './components';

import { styled } from './config/stitches';
import SearchPage from './pages/search.page';

import './styles.css'

const S = {
  Container: styled('div', {
    display: 'flex',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    background: '$mauve1'
  }),
  Wrapper: styled('div', {
    display: 'flex',
    height: '95%',
    width: '100%',
    gap: '$4',
  })
}


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <S.Container>
      <S.Wrapper>
        <Navbar />
          <Routes>
            <Route path='/' element={<SearchPage />} />
          </Routes>
        </S.Wrapper>
      </S.Container>
    </BrowserRouter>
  </React.StrictMode>
);