import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import colors from '~/styles/colors';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 20px;

  background-color: ${colors.bg};
`;

export const ProfileContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ProfileContent = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Avatar = styled.Image`
  height: 70px;
  width: 70px;
  border-radius: 35px;
  margin-right: 20px;
`;

export const Welcome = styled.Text`
  font-size: 12px;
  color: ${colors.fontLight};
`;

export const UserName = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;

export const SignOutButton = styled(RectButton)`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

export const TableHeader = styled.View`
  margin-top: 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
`;

export const TableHeaderTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${colors.fontDark};
`;

export const TableHeaderButton = styled(RectButton)``;

export const TableHeaderButtonText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${props => (props.selected ? colors.primary : colors.fontLight)};
  text-decoration: ${props => (props.selected ? 'underline' : 'none')};
`;

export const DeliveriesList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingTop: 10 },
})`
  width: 100%;
`;
