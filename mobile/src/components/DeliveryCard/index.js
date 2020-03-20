import React, { memo } from 'react';
import { View, Text } from 'react-native';

import { Container } from './styles';

const DeliveryCard = ({ data }) => {
  return (
    <Container>
      <Text>DELIVERY {data.id}</Text>
    </Container>
  );
};

export default memo(DeliveryCard);
