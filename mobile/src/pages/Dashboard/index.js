import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '~/styles/colors';

import api from '~/services/api';

import DeliveryCard from '~/components/DeliveryCard';

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
  List,
} from './styles';

import { signOut } from '~/store/modules/auth/actions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state?.user?.profile);
  const auth = useSelector(state => state.auth);

  const [avatarImageUrl, setAvatarImageUrl] = useState();
  const [delivered, setDelivered] = useState(false);
  const [deliveries, setDeliveries] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleLogOut = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  const handleDelivered = useCallback(() => {
    if (!loading) {
      setDelivered(true);
    }
  }, [loading]);

  const handlePeding = useCallback(() => {
    if (!loading) {
      setDelivered(false);
    }
  }, [loading]);

  // eslint-disable-next-line react/prop-types
  const renderItem = ({ item }) => <DeliveryCard data={item} />;

  const loadMoreDeliveries = useCallback(async () => {
    if (loading || page + 1 > totalPages) {
      return;
    }
    try {
      setLoading(true);
      const newPage = page + 1;
      setPage(newPage);
      const { data } = await api.get(`/deliverymen/${auth.id}/deliveries`, {
        params: {
          delivered,
          page: newPage,
        },
      });

      const { data: data2 } = await api.get(
        `/deliverymen/${auth.id}/deliveries`,
        {
          params: {
            delivered,
            page: newPage + 1,
          },
        }
      );

      // // teste
      const d1Ids = data.data.map(d => d.id);
      const d2Ids = data2.data.map(d => d.id);

      console.tron.log(d1Ids.filter(x => d2Ids.includes(x)));

      // teste

      const newData = [
        ...deliveries,
        ...data.data.map(d => ({ ...d, id: String(d.id) })),
      ];
      setDeliveries(newData);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (err) {
      Alert.alert('Não foi possível carregar as entregas');
      setLoading(false);
    }
  }, [auth.id, delivered, deliveries, loading, page, totalPages]);

  useEffect(() => {
    if (user?.avatar_url) {
      setAvatarImageUrl(user.avatar_url);
    } else {
      setAvatarImageUrl(
        'https://api.adorable.io/avatars/50/abott@adorable.png'
      );
    }
  }, [user]);

  useEffect(() => {
    loadMoreDeliveries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getItemLayout = (data, index) => ({
    length: 170,
    offset: 170 * index,
    index,
  });

  return (
    <Container>
      <ProfileContainer>
        <ProfileContent>
          <Avatar source={{ uri: avatarImageUrl }} />
          <View>
            <Welcome>Bem vindo de volta,</Welcome>
            <UserName>{user?.name}</UserName>
          </View>
        </ProfileContent>
        <SignOutButton onPress={handleLogOut}>
          <Icon name="exit-to-app" size={24} color={colors.red} />
        </SignOutButton>
      </ProfileContainer>

      <TableHeader>
        <TableHeaderTitle>Entregas</TableHeaderTitle>
        <TableHeaderButton>
          <TableHeaderButtonText selected={!delivered} onPress={handlePeding}>
            Pendentes
          </TableHeaderButtonText>
        </TableHeaderButton>
        <TableHeaderButton>
          <TableHeaderButtonText selected={delivered} onPress={handleDelivered}>
            Entregues
          </TableHeaderButtonText>
        </TableHeaderButton>
      </TableHeader>

      <List
        data={deliveries}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        onEndReached={loadMoreDeliveries}
      />
    </Container>
  );
};

export default Dashboard;
