import React from 'react';
import PropTypes from 'prop-types';

import { Container, Top, Bottom, Content, StatusBar } from './styles';

export default function Background({ children }) {
  return (
    <Container>
      <StatusBar />
      <Top />
      <Bottom />
      <Content>{children}</Content>
    </Container>
  );
}

Background.propTypes = {
  children: PropTypes.element.isRequired,
};
