import styled from 'styled-components/native';
import logo from '~/assets/logo.png';

import Button from '~/components/Button';

import colors from '~/styles/colors';

export const Container = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;

  background-color: ${colors.primary};
`;

export const Logo = styled.Image.attrs(() => ({
  source: logo,
}))`
  tint-color: ${colors.white};
  margin-bottom: 50px;
`;

export const SignButton = styled(Button)`
  background-color: ${colors.green};
`;
