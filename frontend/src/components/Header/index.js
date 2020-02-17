import React from 'react';

import { Container, Logo, Perfil, Menu } from './styles';

export default function Header() {
  return (
    <Container>
      <Logo />
      <Menu>MENU</Menu>
      <Perfil>
        <h1>Nome do Usuário</h1>
        <button type="button">sair do sistema</button>
      </Perfil>
    </Container>
  );
}
