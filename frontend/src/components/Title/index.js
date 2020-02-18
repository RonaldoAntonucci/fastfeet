import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: right;
  width: 100%;

  margin-bottom: 14px;

  h1 {
    font-size: 24px;
    color: #444;
    margin-bottom: 30px;
  }

  div {
    display: flex;
    width: 100%;
    align-items: flex-end;
    justify-content: space-between;
  }
`;
