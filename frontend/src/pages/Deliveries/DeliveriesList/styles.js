import React from 'react';
import styled from 'styled-components';

import { lighten } from 'polished';

export const Status = styled.div.attrs(props => {
  let color = null;
  switch (props.children) {
    case 'CANCELADA':
      color = '#DE3B3B';
      break;
    case 'ENTREGUE':
      color = '#2CA42B';
      break;
    case 'RETIRADA':
      color = '#4D85EE';
      break;
    default:
      color = '#C1BC35';
      break;
  }

  return {
    children: (
      <>
        <div />
        {props.children}
      </>
    ),
    color,
  };
})`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 4px 0;
  width: 120px;

  border-radius: 12px;
  font-weight: bold;
  background-color: ${props => lighten(0.25, props.color)};
  color: ${props => props.color};
  font-size: 14px;

  div {
    background-color: ${props => props.color};
    height: 14px;
    width: 14px;
    border-radius: 100%;
    margin: 0;
    padding: 0;
    margin-right: 8px;
  }
`;
