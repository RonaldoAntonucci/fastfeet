import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '~/styles/colors';

export const BarButton = styled.TouchableOpacity`
  flex: 1;
  height: 70px;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.View`
  background-color: ${colors.bg};

  border-width: 3px;
  border-bottom-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-top-color: ${colors.border};
`;

export const Label = styled.Text`
  color: ${props => (props.isFocused ? colors.primary : colors.grey)};
  font-size: 14px;
  font-weight: bold;
`;

export const BarIcon = styled(Icon).attrs(props => ({
  size: 24,
  color: props.isFocused ? colors.primary : colors.grey,
}))``;
