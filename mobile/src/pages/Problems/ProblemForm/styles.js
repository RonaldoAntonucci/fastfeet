import styled from 'styled-components/native';
import { Form as UnForm } from '@unform/mobile';
import UnformInput from '~/components/Input';
import Button from '~/components/Button';

import colors from '~/styles/colors';

export const Container = styled.SafeAreaView``;

export const FormContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Form = styled(UnForm)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Input = styled(UnformInput)`
  height: 300px;
  border: 1px solid ${colors.border};
  elevation: 3;
`;

export const SubmitButton = styled(Button)``;
