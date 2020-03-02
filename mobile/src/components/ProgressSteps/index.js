import React from 'react';
import { Text } from 'react-native';

import { Container } from './styles';

export default function ProgressSteps({ current }) {
  return (
    <Container>
      <Text>current : {current}</Text>
    </Container>
  );
}
