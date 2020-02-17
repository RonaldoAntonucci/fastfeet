import React from 'react';
import styled from 'styled-components';

import logo from '~/assets/logo.png';

export const Container = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #dddddd;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.2);
`;

export const Logo = styled.div.attrs(() => ({
  children: <img src={logo} alt="FastFeet" />,
}))`
  img {
    height: 26px;
  }
  padding: 20px 30px;
`;

export const Perfil = styled.div`
  width: 100;
  height: 100%;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 14px;
    color: #666;
  }

  button {
    margin-top: 5px;
    width: 100%;
    background: none;
    border: none;
    text-align: right;
    font-size: 14px;
    color: #de3b3b;
  }
`;

export const Menu = styled.nav`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 30px;
`;
