/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Delivery from '~/components/DeliveryItem';

import {
  Container,
  ProfileContainer,
  ProfileContent,
  Avatar,
  Welcome,
  UserName,
  SignOutButton,
  TableHeader,
  TableHeaderTitle,
  TableHeaderButton,
  TableHeaderButtonText,
  DeliveriesList,
} from './styles';

import { signOut } from '~/store/modules/auth/actions';
import colors from '~/styles/colors';

function Deliveries({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.profile);

  const [avatarImageUrl, setAvatarImageUrl] = useState();
  const [delivered, setDelivered] = useState(false);
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    if (user.avatar_url) {
      setAvatarImageUrl(user.avatar_url);
    } else {
      setAvatarImageUrl(
        'https://api.adorable.io/avatars/50/abott@adorable.png'
      );
    }
  }, [user]);

  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: { data },
        } = await api.get(`/deliverymen/${user.id}/deliveries`, {
          params: {
            delivered,
          },
        });
        setDeliveries(data);
      } catch (err) {
        Alert.alert('Não foi possível carregar as entregas');
      }
    };
    getData();

    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, [delivered, navigation, user.id]);

  const handleLogOut = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  return (
    <Container>
      <ProfileContainer>
        <ProfileContent>
          <Avatar source={{ uri: avatarImageUrl }} />
          <View>
            <Welcome>Bem vindo de volta,</Welcome>
            <UserName>{user.name}</UserName>
          </View>
        </ProfileContent>
        <SignOutButton onPress={handleLogOut}>
          <Icon name="exit-to-app" size={24} color={colors.red} />
        </SignOutButton>
      </ProfileContainer>
      <TableHeader>
        <TableHeaderTitle>Entregas</TableHeaderTitle>
        <TableHeaderButton>
          <TableHeaderButtonText
            selected={!delivered}
            onPress={() => setDelivered(false)}
          >
            Pendentes
          </TableHeaderButtonText>
        </TableHeaderButton>
        <TableHeaderButton>
          <TableHeaderButtonText
            selected={delivered}
            onPress={() => setDelivered(true)}
          >
            Entregues
          </TableHeaderButtonText>
        </TableHeaderButton>
      </TableHeader>
      <DeliveriesList
        data={deliveries}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Delivery
            data={item}
            handleDetails={() => navigation.navigate('Delivery', { item })}
          />
        )}
      />
    </Container>
  );
}

export default memo(Deliveries);
