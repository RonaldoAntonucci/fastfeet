import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Text from '~/components/Text';

import colors from '~/styles/colors';

export const Container = styled.View`
  width: 100%;
  height: 50px;
  margin-bottom: 4px;
  flex-direction: row;
  padding-top: 20px;

  background-color: ${colors.bg};
`;

export const Title = styled(Text)`
  font-size: 22px;
  font-weight: bold;
  color: ${colors.fontDark};
`;

export const Content = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
`;

export const Button = styled(RectButton)`
  height: 100%;
  justify-content: flex-end;
  padding-bottom: 2px;
`;

export const ButtonText = styled(Text)`
  font-size: 12px;
  font-weight: bold;
  color: ${props => (props.selected ? colors.primary : colors.fontLight)};
  text-decoration: ${props => (props.selected ? 'underline' : 'none')};
  margin-left: 25px;
`;
