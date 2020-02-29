import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import api from '~/services/api';

import {
  Container,
  Card,
  Avatar,
  Label,
  TextValue,
  LogoutButton,
} from './styles';

import { signOut } from '~/store/modules/auth/actions';

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.profile);

  const [avatarImageUrl, setAvatarImageUrl] = useState();

  useEffect(() => {
    if (user.avatar_url) {
      setAvatarImageUrl(user.avatar_url);
    } else {
      setAvatarImageUrl(
        'https://api.adorable.io/avatars/50/abott@adorable.png'
      );
    }
  }, [user]);

  const handleLogOut = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  return (
    <Container>
      <Avatar
        source={{
          uri: avatarImageUrl,
        }}
        onError={() =>
          setAvatarImageUrl(
            'https://api.adorable.io/avatars/50/abott@adorable.png'
          )
        }
      />
      <Card>
        <Label>Nome</Label>
        <TextValue>{user.name}</TextValue>
        <Label>Email</Label>
        <TextValue>{user.email}</TextValue>
        <Label>Data de cadastro</Label>
        <TextValue>{user.createdAt}</TextValue>
        <LogoutButton onPress={handleLogOut}>Logout</LogoutButton>
      </Card>
    </Container>
  );
}
