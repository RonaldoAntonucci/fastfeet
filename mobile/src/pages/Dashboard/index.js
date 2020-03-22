import React, { useEffect, useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '~/styles/colors';

import Loading from '~/components/Loading';
import List from './List';

import {
  Container,
  ProfileContainer,
  ProfileContent,
  Avatar,
  Welcome,
  UserName,
  SignOutButton,
} from './styles';

import { signOut } from '~/store/modules/auth/actions';
import { loadMoreRequest } from '~/store/modules/deliveries/actions';

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state?.user?.profile);
  const loading = !useSelector(state => state.deliveries.initialized);

  const [avatarImageUrl, setAvatarImageUrl] = useState();

  const handleLogOut = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

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
    dispatch(loadMoreRequest({ reset: true }));
    dispatch(loadMoreRequest({ reset: true, delivered: true }));
  }, [dispatch]);

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

      {loading ? <Loading /> : <List navigation={navigation} />}
    </Container>
  );
};

Dashboard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default memo(Dashboard);
