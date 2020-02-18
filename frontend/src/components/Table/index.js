import styled, { css } from 'styled-components';

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

const ActionButton = styled.button`
  color: ${props => colors[props.color]};
  background: transparent;
  border: 0;

  &:first-child {
    margin-right: 20px;
  }
`;

export { TableFooter, TableFooterButton, ActionButton };

export default Table;
