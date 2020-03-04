import React from 'react';
import PropTypes from 'prop-types';

import { Container, Activity } from './styles';

export default function Loading({ size }) {
  return (
    <Container size={size}>
      <Activity />
    </Container>
  );
}

Loading.propTypes = {
  size: PropTypes.string,
};

Loading.defaultProps = {
  size: 'large',
};
