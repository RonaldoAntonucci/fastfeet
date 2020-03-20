import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';
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

const Dashboard = ({ navigation }) => {
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

  const loadMoreDeliveries = useCallback(async () => {
    if (loading || page + 1 > totalPages) {
      return;
    }
    try {
      setLoading(true);

      const { data } = await api.get(`/deliverymen/${auth.id}/deliveries`, {
        params: {
          delivered,
          page: page + 1,
          quantity: 10,
        },
      });

      const newData = [
        ...deliveries,
        ...data.data.map(d => ({
          ...d,
          id: String(d.id),
          createdAt: format(new Date(d.createdAt), "dd'/'MM'/'y", {
            locale: pt,
          }),
        })),
      ];

      setDeliveries(newData);
      setTotalPages(data.totalPages);
      setPage(page + 1);
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

  const handleDetails = useCallback(
    item => {
      if (loading) {
        return () => {};
      }
      return navigation.navigate('Delivery', { item });
    },
    [loading, navigation]
  );

  // eslint-disable-next-line react/prop-types
  const renderItem = ({ item }) => (
    <DeliveryCard data={item} handleDetails={handleDetails} />
  );

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
        // eslint-disable-next-line react/prop-types
        keyExtractor={item => item.id}
        renderItem={renderItem}
        onEndReached={loadMoreDeliveries}
      />
    </Container>
  );
};

Dashboard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Dashboard;
