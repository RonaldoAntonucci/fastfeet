import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Logo, Perfil, Menu, NavButton } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const handleSignOut = useCallback(() => dispatch(signOut()), [dispatch]);

  return (
    <Container>
      <Logo to="/" />
      <Menu>
        <NavButton selected to="/">
          ENCOMENDAS
        </NavButton>
        <NavButton to="/deliveries"> ENTREGADORES </NavButton>
        <NavButton to="/recipients"> DESTINATÁRIOS </NavButton>
        <NavButton to="/problems"> PROBLEMAS </NavButton>
      </Menu>
      <Perfil>
        <strong> {profile.name} </strong>
        <button type="button" onClick={handleSignOut}>
          sair do sistema
        </button>
      </Perfil>
    </Container>
  );
}
