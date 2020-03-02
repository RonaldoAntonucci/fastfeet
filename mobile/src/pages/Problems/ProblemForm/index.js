import React from 'react';
import { Text } from 'react-native';

import Container from '~/components/PageContainer';

import {} from './styles';

export default function ProblemsForm({ navigation }) {
  return (
    <Container
      scroll
      title="Informar Problema"
      handleBack={() => navigation.goBack()}
    >
      <Text>PROBLEM</Text>
    </Container>
  );
}
