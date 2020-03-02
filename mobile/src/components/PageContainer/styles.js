import styled from 'styled-components/native';
import StyledIcon from 'react-native-vector-icons/MaterialIcons';
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
  height: ${`${Dimensions.get('window').height - 150}px`};
  align-self: stretch;
`;

export const NoScroll = styled.View`
  flex: 1;
  height: ${`${Dimensions.get('window').height - 150}px`};
  align-self: stretch;
`;
