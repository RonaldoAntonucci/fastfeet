import React, { useCallback, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Logo, Perfil, Menu, NavButton } from './styles';

function Header() {
  const [selected, setSelected] = useState('deliveries');
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const handleSignOut = useCallback(() => dispatch(signOut()), [dispatch]);

  return (
    <Container>
      <Logo to="/" />
      <Menu>
        <NavButton
          selected={selected === 'deliveries'}
          to="/deliveries"
          onClick={() => setSelected('deliveries')}
        >
          ENCOMENDAS
        </NavButton>
        <NavButton
          selected={selected === 'deliverymen'}
          to="/deliverymen"
          onClick={() => setSelected('deliverymen')}
        >
          ENTREGADORES
        </NavButton>
        <NavButton
          selected={selected === 'recipients'}
          to="/recipients"
          onClick={() => setSelected('recipients')}
        >
          DESTINATÁRIOS
        </NavButton>
        <NavButton
          selected={selected === 'problems'}
          to="/problems"
          onClick={() => setSelected('problems')}
        >
          PROBLEMAS
        </NavButton>
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

export default memo(Header);
