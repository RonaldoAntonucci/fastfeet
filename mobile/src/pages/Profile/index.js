import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container, Card, Label, TextValue, LogoutButton } from './styles';

import { signOut } from '~/store/modules/auth/actions';

export default function Profile() {
  const dispatch = useDispatch();

  const handleLogOut = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  return (
    <Container>
      <Card>
        <Label>Nome</Label>
        <TextValue>Seu Joao</TextValue>
        <Label>Email</Label>
        <TextValue>exemplo@rocketsreat.com</TextValue>
        <Label>Data de cadastro</Label>
        <TextValue>10/02/2019</TextValue>
        <LogoutButton onPress={handleLogOut}>Logout</LogoutButton>
      </Card>
    </Container>
  );
}
