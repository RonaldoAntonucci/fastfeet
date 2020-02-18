import styled from 'styled-components';

import { darken } from 'polished';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  > div {
    z-index: 1;
    display: none;
    position: absolute;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 35px;

    > div:last-child {
      background-color: #fff;
      box-shadow: 0px 0px 2px #00000026;
      margin-top: 10px;

      padding: 10px;
    }
  }

  &:hover {
    > div {
      display: flex;
    }
  }
`;

export const Arrow = styled.div`
  position: absolute;
  z-index: 1;
  display: inline-block;

  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #fff;
`;

export const MoreButton = styled.button`
  background: none;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 5px;

  &:hover {
    border: 1px solid ${props => darken(0.1, props.color || '#C6C6C6')};
  }
`;
