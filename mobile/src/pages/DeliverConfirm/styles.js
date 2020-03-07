import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StyledButton from '~/components/Button';

import colors from '~/styles/colors';

export const Content = styled.View`
  flex: 1;
`;

export const CameraContent = styled.View`
  flex: 1;
  padding: 20px;
  border-radius: 4px;
  overflow: hidden;
`;

export const Camera = styled(RNCamera)`
  flex: 1;
  border: 2px solid ${colors.border};
  overflow: hidden;
  border-radius: 8px;
`;

export const Preview = styled.ImageBackground`
  flex: 1;
  justify-content: flex-end;
  padding: 5px;

  flex: 1;
  border: 2px solid ${colors.border};
  overflow: hidden;
  border-radius: 8px;
  elevation: 3;
`;

export const ButtonsPreviewContent = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 5px;
  width: 100%;
`;

export const ButtonsPreviewIcon = styled(Icon).attrs(() => ({
  size: 25,
  color: colors.bg,
}))``;

export const ButtonsPreview = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const ButtonContent = styled.View`
  align-items: center;
  margin-bottom: 10px;
`;

export const Button = styled(StyledButton)`
  margin: 0px;
`;
