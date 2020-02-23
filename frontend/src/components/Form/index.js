import styled from 'styled-components';
import { Form as Unform } from '@unform/web';
import Input from './Input';

import colors from '~/styles/colors';

export const Form = styled(Unform)`
  background-color: ${colors.second};
  padding: 30px;
  border-radius: 4px;

  input {
    font-size: 21px;
    height: 45px;
    margin-bottom: 15px;
  }
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: row;

  div {
    width: 100%;
  }

  div + div {
    margin: 0 10px;
  }
`;

export { Input };
