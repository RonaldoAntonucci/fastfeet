import styled from 'styled-components/native';

import colors from '~/styles/colors';

export const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  width: 100%;
  flex: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 10px;
`;

export const Label = styled.View`
  justify-content: center;
  align-items: center;
`;

export const LabelText = styled.Text`
  font-size: 8px;
  color: ${colors.fontLight};
`;

export const StepContainer = styled.View`
  flex: 1;
`;

export const StepContent = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 20px;
`;

export const Ellipse = styled.View`
  border-radius: 100px;
  width: 9px;
  height: 9px;
  border: 1px solid ${colors.primary};
  background-color: ${props => (props.current ? colors.primary : colors.bg)};
  z-index: 2;
`;

export const Line = styled.View`
  height: 1.5px;
  width: 100%;
  background-color: ${props =>
    props.transparent ? colors.primary : colors.bg};
`;
