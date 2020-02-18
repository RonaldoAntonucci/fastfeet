import styled, { css } from 'styled-components';
import { darken } from 'polished';

import { Input } from '@rocketseat/unform';
import ActionDropdown from './Dropdown';

import colors from '~/styles/colors';

const Table = styled.table`
  width: 100%;
  text-align: left;

  border-collapse: separate;
  border-spacing: 0 1.5em;

  tr {
    color: #666;
    font-size: 16px;
    line-height: 20px;

    td:first-child,
    th:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    td:last-child,
    th:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }

  tbody tr {
    background-color: #fff;
    box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.2);

    &:hover {
      background: ${darken(0.04, '#fff')};
    }
  }

  thead tr th:last-child {
    text-align: right;
  }

  tbody tr td:last-child {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  th {
    color: #444;
  }

  td,
  th {
    padding: 14px;
  }
`;

const TableFooter = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    margin: 0 10px;
  }
`;

const TableFooterButton = styled.button`
  background: ${props => (props.disabled ? colors.white : colors.primary)};
  color: ${props => (props.disabled ? colors.darkGrey : colors.white)};
  padding: 10px 15px;
  border-radius: 4px;
  border: 0;

  ${props =>
    props.disabled &&
    css`
      border: 2px solid ${colors.grey};
    `}

  &:hover {
    ${props =>
      props.disabled &&
      css`
        cursor: not-allowed;
      `}
  }
`;

const TablePagination = styled.div`
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
      color: #444444;
    }
    margin: 0 8px;
  }

  input {
    background-color: #fff;
    border: 1px solid #444444;
    border-radius: 20px;
  }
`;

const PaginationInput = styled(Input)``;

export {
  TableFooter,
  TableFooterButton,
  ActionDropdown,
  TablePagination,
  PaginationInput,
};

export default Table;
