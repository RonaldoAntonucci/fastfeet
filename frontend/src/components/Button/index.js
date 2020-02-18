import React from 'react';
import styled from 'styled-components';

import colors from '~/styles/colors';

export default styled.button.attrs(props => ({
  children: props.icon ? (
    <>
      <div>{props.icon()}</div>
      <span>{props.children}</span>
    </>
  ) : (
    props.children
  ),
}))`
  display: flex;
  align-items: center;

  padding: 0 16px;
  background-color: ${colors.primary};
  color: #fff;
  border-radius: 4px;
  border: none;
  font-weight: bold;
  font-size: 14px;
  height: 36px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;

    svg {
      color: ${colors.white};
      font-size: 20px;
    }
  }
`;
