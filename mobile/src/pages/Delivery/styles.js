import styled from 'styled-components/native';
import StyledIcon from 'react-native-vector-icons/MaterialIcons';
import { RectButton } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

import colors from '~/styles/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Icon = styled(StyledIcon).attrs(({ color }) => ({
  size: 24,
  color: color || colors.primary,
}))``;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 10px;
  padding: 10px;
`;

export const BackButton = styled.TouchableOpacity``;

export const TitleContent = styled.View`
  justify-content: center;
  align-items: center;
  padding-right: 26px;
  width: ${`${Dimensions.get('window').width - 44}px`};
`;

export const Title = styled.Text`
  font-size: 16px;
  color: ${colors.white};
  font-weight: bold;
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalIndicator: true,
  contentContainerStyle: { padding: 18 },
})`
  flex: 1;
`;

export const Card = styled.View.attrs()`
  background-color: ${colors.bg};
  margin-top: 10px;
  border-radius: 4px;
  padding: 12px;
  /* border: 2px solid ${colors.border}; */
  elevation: ${props => (props.elevation ? props.elevation : 3)};
`;

export const CardTitleContainer = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: flex-end;
`;

export const CardTitle = styled.Text`
  font-size: 14px;
  color: ${colors.primary};
  font-weight: bold;
  margin-left: 10px;
`;

export const CardRow = styled.View`
  margin-top: 6px;
  margin-top: 15px;
  flex-direction: row;
`;

export const CardLabel = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.grey};
`;

export const CardValue = styled.Text`
  font-size: 14px;
  color: ${colors.font};
`;

export const ButtonContent = styled.View`
  flex: 1;
`;

export const ActionButton = styled(RectButton)``;

export const ButtonText = styled.Text``;
