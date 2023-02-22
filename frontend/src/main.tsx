import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navbar } from './components';

import { styled } from './config/stitches';
import SearchPage from './pages/search.page';

import './styles.css'


const router = createBrowserRouter([
  {
    path: '/',
    element: <SearchPage />,
  }, {
    path: '/olx',
    element: <div>OLX</div>
  }

])

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
    <S.Container>
      <S.Wrapper>
        <Navbar />
        <RouterProvider router={router} />
      </S.Wrapper>
    </S.Container>
  </React.StrictMode>
);