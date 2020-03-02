import React, { useMemo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';

import api from '~/services/api';

import Container from '~/components/PageContainer';

import colors from '~/styles/colors';

import {
  Icon,
  Card,
  CardTitleContainer,
  CardTitle,
  CardRow,
  CardLabel,
  CardValue,
  ButtonContent,
  CardActions,
  ActionButton,
  ButtonText,
} from './styles';

export default function Delivery({
  route: {
    params: { item },
  },
  navigation,
}) {
  const user = useSelector(state => state.user.profile);
  const [DeliveryItem, setDeliveryItem] = useState(item);

  const formatedStartedAt = useMemo(
    () =>
      DeliveryItem.start_date
        ? format(new Date(DeliveryItem.start_date), "dd'/'MM'/'y", {
            locale: pt,
          })
        : '--/--/--',
    [DeliveryItem.start_date]
  );

  const formatedEndedAt = useMemo(
    () =>
      DeliveryItem.end_date
        ? format(new Date(DeliveryItem.end_date), "dd'/'MM'/'y", {
            locale: pt,
          })
        : '--/--/--',
    [DeliveryItem.end_date]
  );

  const adress = useMemo(
    () =>
      `${item.Recipient.street}, ${item.Recipient.number}, ${item.Recipient.city} - ${item.Recipient.state}, ${item.Recipient.zip}`,
    [item.Recipient]
  );

  const handleWithdraw = useCallback(async () => {
    const response = await api.post(
      `/deliverymen/${user.id}/deliveries/${DeliveryItem.id}/withdraw`,
      { start_date: new Date() }
    );
    setDeliveryItem(response.data);
  }, [DeliveryItem, user]);

  return (
    <Container
      handleBack={() => {
        navigation.goBack();
      }}
      title="Detalhes da encomenda"
      scroll
    >
      <>
        <Card>
          <CardTitleContainer>
            <Icon name="local-shipping" />
            <CardTitle>Informações da entrega</CardTitle>
          </CardTitleContainer>
          {item.Recipient && (
            <>
              <CardRow>
                <View>
                  <CardLabel>DESTINATÁRIO</CardLabel>
                  <CardValue>{item.Recipient.name}</CardValue>
                </View>
              </CardRow>
              <CardRow>
                <View>
                  <CardLabel>ENDEREÇO DE ENTREGA</CardLabel>
                  <CardValue>{adress}</CardValue>
                </View>
              </CardRow>
            </>
          )}

          <CardRow>
            <View>
              <CardLabel>PRODUTO</CardLabel>
              <CardValue>{DeliveryItem.product}</CardValue>
            </View>
          </CardRow>
        </Card>
        <Card>
          <CardTitleContainer>
            <Icon name="event" />
            <CardTitle>Situação da entrega</CardTitle>
          </CardTitleContainer>
          <CardRow>
            <View>
              <CardLabel>STATUS</CardLabel>
              <CardValue>{DeliveryItem.status}</CardValue>
            </View>
          </CardRow>
          <CardRow>
            <View style={{ width: '50%' }}>
              <CardLabel>DATA DE RETIRADA</CardLabel>
              <CardValue>{formatedStartedAt}</CardValue>
            </View>
            <View style={{ width: '50%', paddingLeft: 12 }}>
              <CardLabel>DATA DE ENTREGA</CardLabel>
              <CardValue>{formatedEndedAt}</CardValue>
            </View>
          </CardRow>
        </Card>
        {DeliveryItem.status !== 'ENTREGUE' && (
          <CardActions>
            <CardRow>
              {DeliveryItem.status !== 'PENDENTE' ? (
                <>
                  <ButtonContent>
                    <ActionButton
                      onPress={() =>
                        navigation.navigate('ProblemForm', {
                          deliveryId: DeliveryItem.id,
                        })
                      }
                    >
                      <Icon name="highlight-off" color={colors.red} />
                      <ButtonText>Informar</ButtonText>
                      <ButtonText>Problema</ButtonText>
                    </ActionButton>
                  </ButtonContent>
                  <ButtonContent>
                    <ActionButton
                      onPress={() =>
                        navigation.navigate('ProblemsList', {
                          deliveryId: DeliveryItem.id,
                        })
                      }
                    >
                      <Icon name="info-outline" color={colors.yellow} />
                      <ButtonText>Visualizar</ButtonText>
                      <ButtonText>Problemas</ButtonText>
                    </ActionButton>
                  </ButtonContent>
                  <ButtonContent>
                    <ActionButton>
                      <Icon name="alarm-on" />
                      <ButtonText>Confirmar</ButtonText>
                      <ButtonText>Entrega</ButtonText>
                    </ActionButton>
                  </ButtonContent>
                </>
              ) : (
                <ButtonContent>
                  <ActionButton onPress={handleWithdraw}>
                    <Icon name="assignment-return" />
                    <ButtonText>Confirmar</ButtonText>
                    <ButtonText>Retirada</ButtonText>
                  </ActionButton>
                </ButtonContent>
              )}
            </CardRow>
          </CardActions>
        )}
      </>
    </Container>
  );
}

Delivery.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      item: PropTypes.shape({
        product: PropTypes.string.isRequired,
        start_date: PropTypes.string,
        end_date: PropTypes.string,
        status: PropTypes.string,
        Recipient: PropTypes.shape({
          street: PropTypes.string,
          number: PropTypes.string,
          city: PropTypes.string,
          state: PropTypes.string,
          zip: PropTypes.string,
          name: PropTypes.string,
        }),
      }).isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func,
  }).isRequired,
};
