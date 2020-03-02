import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RectButton } from 'react-native-gesture-handler';

import colors from '~/styles/colors';

export const Container = styled.View`
  width: 100%;
  background-color: ${colors.secondary};
  padding: 1px;
  border-radius: 4px;
  margin-bottom: 28px;
  border: 1px solid ${colors.border};
`;

export const Content = styled.View`
  background-color: ${colors.bg};
  padding: 20px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

export const TitleIcon = styled(Icon).attrs(() => ({
  name: 'local-shipping',
  size: 24,
  color: colors.primary,
}))``;

export const TitleText = styled.Text`
  font-size: 14px;
  color: ${colors.primary};
  font-weight: bold;
  margin-left: 10px;
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const FooterContent = styled.View`
  flex-direction: column;
  padding: 20px;
  flex: 1;
`;

export const FooterLabel = styled.Text`
  font-size: 8px;
  color: ${colors.fontLight};
  font-weight: bold;
`;

export const FooterInfo = styled.Text`
  font-size: 12px;
  color: ${colors.fontDark};
  font-weight: bold;
`;

export const FooterButton = styled(RectButton)`
  padding-top: 10px;
`;

export const FooterButtonTitle = styled.Text`
  font-size: 14px;
  color: ${colors.primary};
  font-weight: bold;
`;
