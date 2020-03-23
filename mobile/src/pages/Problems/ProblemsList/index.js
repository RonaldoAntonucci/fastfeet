import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';
import { Alert } from 'react-native';

import api from '~/services/api';

import Background from '~/components/Background';

import {
  Container,
  TitleContainer,
  ListTitle,
  Content,
  List,
  Card,
  CardProblem,
  CardDate,
} from './styles';

const RenderItem = ({ item }) => (
  <Card>
    <CardProblem multiline textAlignVertical="top">
      {item.description}
    </CardProblem>
    <CardDate>{item.createdAt}</CardDate>
  </Card>
);

const ProblemsList = ({
  route: {
    params: { deliveryId },
  },
}) => {
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const deliverymanId = useSelector(state => state.auth.id);

  const loadMore = useCallback(
    async ({ reset = false } = {}) => {
      if (loading || page + 1 > totalPages) {
        return;
      }
      try {
        setLoading(true);
        const { data } = await api.get(
          `deliverymen/${deliverymanId}/deliveries/${deliveryId}/problems`,
          {
            params: {
              page: page + 1,
              quantity: 5,
            },
          }
        );
        setPage(page + 1);
        const newData = data.data.map(d => ({
          ...d,
          createdAt: format(new Date(d.createdAt), "dd'/'MM'/'y", {
            locale: pt,
          }),
        }));
        const prev = reset ? [] : problems;
        setProblems([...prev, ...newData]);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        Alert.alert('Não foi possível carregar os problemas.');
      }
    },
    [deliveryId, deliverymanId, loading, page, problems, totalPages]
  );

  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Background>
      <Container>
        <TitleContainer>
          <ListTitle>Encomenda {deliveryId}</ListTitle>
        </TitleContainer>
        <Content>
          <List
            data={problems}
            renderItem={RenderItem}
            refreshing={loading}
            onEndReached={loadMore}
            onRefres={() => loadMore({ reset: true })}
          />
        </Content>
      </Container>
    </Background>
  );
};

RenderItem.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

ProblemsList.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ deliveryId: PropTypes.string.isRequired })
      .isRequired,
  }).isRequired,
};

export default ProblemsList;
