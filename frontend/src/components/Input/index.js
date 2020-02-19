import styled from 'styled-components';
import { Input } from '@rocketseat/unform';
import colors from '~/styles/colors';

export default styled(Input)`
  background: rgba(255, 255, 255, 1);
  border: 1px solid ${colors.border};
  border-radius: 4px;
  height: 40px;
  padding: 0 15px;
  color: ${colors.fontDark};
  /* margin: 0 0 15px; */
  width: 100%;
`;
