import styled, { css } from 'styled-components';

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

// const ActionMoreButton = styled.button.attrs(() => ({
//   children: MdMoreHoriz({ size: 24, color: '#C6C6C6' }),
//   type: 'button',
// }))`
//   background: none;
//   border: 1px solid rgba(0, 0, 0, 0);
//   border-radius: 5px;

//   &:hover {
//     border: 1px solid ${darken(0.1, '#C6C6C6')};
//   }
// `;

export { TableFooter, TableFooterButton, ActionDropdown };

export default Table;
