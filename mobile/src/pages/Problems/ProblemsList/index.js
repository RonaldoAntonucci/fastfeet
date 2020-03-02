import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';
import { View, Text } from 'react-native';

import api from '~/services/api';

import Container from '~/components/PageContainer';

import {
  TitleContainer,
  ListTitle,
  Content,
  List,
  Card,
  CardProblem,
  CardDate,
} from './styles';

function ProblemsList({
  navigation,
  route: {
    params: { deliveryId },
  },
}) {
  const [problems, setProblems] = useState([]);
  const deliverymanId = useSelector(state => state.user.profile.id);

  useEffect(() => {
    const getData = async () => {
      const { data } = await api.get(
        `deliverymen/${deliverymanId}/deliveries/${deliveryId}/problems`
      );
      setProblems(data.data);
    };
    try {
      getData();
    } catch (err) {
      console.tron.log(err);
    }
  }, [deliveryId, deliverymanId]);

  return (
    <Container
      title="Visualizar Problemas"
      handleBack={() => {
        navigation.goBack();
      }}
    >
      <>
        <TitleContainer>
          <ListTitle>Encomenda {deliveryId}</ListTitle>
        </TitleContainer>
        <Content>
          <List
            data={problems}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Card>
                <CardProblem multiline textAlignVertical="top">
                  {item.description}
                </CardProblem>
                <CardDate>
                  {format(new Date(item.createdAt), "dd'/'MM'/'y", {
                    locale: pt,
                  })}
                </CardDate>
              </Card>
            )}
          />
        </Content>
      </>
    </Container>
  );
}

export default memo(ProblemsList);
