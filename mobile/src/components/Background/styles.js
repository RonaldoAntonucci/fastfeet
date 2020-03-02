import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

import colors from '~/styles/colors';

export const Top = styled.View`
  background-color: ${colors.primary};
  flex: 1;
  top: 0;
`;

export const Bottom = styled.View`
  background-color: ${colors.bg};
  flex: 3;
`;

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
`;

export const StatusBar = styled.StatusBar.attrs(() => ({
  backgroundColor: colors.primary,
  barStyle: 'light-content',
}))``;
