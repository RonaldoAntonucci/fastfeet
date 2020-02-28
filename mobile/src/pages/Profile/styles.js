import styled from 'styled-components/native';
import Button from '~/components/Button';

import colors from '~/styles/colors';

export const Container = styled.View`
  align-items: center;
  padding: 36px;
`;

export const Card = styled.View`
  width: 100%;
`;

export const Label = styled.Text`
  font-size: 16px;
  color: ${colors.fontLight};
`;

export const TextValue = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${colors.fontDark};
  margin-bottom: 15px;
`;

export const LogoutButton = styled(Button)`
  background-color: ${colors.red};
  width: 100%;
`;
