import styled from 'styled-components/native';

import colors from '~/styles/colors';

export const TitleContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const ListTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.bg};
  margin-bottom: 12px;
`;

export const Content = styled.View`
  flex: 1;
  background-color: ${colors.bg};
  border-radius: 4px;
  padding: 0;
  margin-horizontal: 18px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  width: 100%;

  padding: 18px;
`;

export const Card = styled.View`
  border: 1px solid ${colors.border};
  border-radius: 4px;
  elevation: 1;
  padding: 16px;

  margin-bottom: 16px;
  background-color: ${colors.bg};
`;

export const CardProblem = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.fontLight};
  margin-bottom: 5px;
`;

export const CardDate = styled.Text`
  color: ${colors.fontTransparent};
`;
