import styled from 'styled-components';

import { Input, Form } from '@rocketseat/unform';

import colors from '~/styles/colors';

export const StyledPagination = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 8px;

  border-radius: 4px;
  width: 100%;

  button {
    background: none;
    border: 0;
    > svg {
      font-size: 24px;
      color: ${colors.fontDark};
    }
    margin: 0 8px;
  }

  input {
    background-color: ${colors.second}d;
    border: 1px solid ${colors.border};
    border-radius: 20px;
    padding-left: 35px;

    &::placeholder {
      color: ${colors.fontDark};
    }
  }
`;

export const StyledInput = styled(Input)``;
export const StyledForm = styled(Form)``;
