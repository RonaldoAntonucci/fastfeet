import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';

import Background from '~/components/Background';

import colors from '~/styles/colors';

import {
  Container,
  Content,
  TitleContainer,
  TitleContent,
  BackButton,
  Icon,
  Title,
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
  const formatedStartedAt = useMemo(
    () =>
      item.start_date
        ? format(new Date(item.start_date), "dd'/'MM'/'y", {
            locale: pt,
          })
        : '--/--/--',
    [item.start_date]
  );

  const formatedEndedAt = useMemo(
    () =>
      item.end_date
        ? format(new Date(item.end_date), "dd'/'MM'/'y", {
            locale: pt,
          })
        : '--/--/--',
    [item.end_date]
  );

  console.tron.log(item.Recipient);

  const adress = useMemo(
    () =>
      `${item.Recipient.street}, ${item.Recipient.number}, ${item.Recipient.city} - ${item.Recipient.state}, ${item.Recipient.zip}`,
    [item.Recipient]
  );

  return (
    <Background>
      <Container>
        <TitleContainer>
          <BackButton
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name="keyboard-arrow-left" color={colors.bg} />
          </BackButton>
          <TitleContent>
            <Title>Detalhes da encomenda</Title>
          </TitleContent>
        </TitleContainer>
        <Content>
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
                <CardValue>{item.product}</CardValue>
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
                <CardValue>{item.status}</CardValue>
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
          <CardActions>
            <CardRow>
              <ButtonContent>
                <ActionButton>
                  <Icon name="highlight-off" color={colors.red} />
                  <ButtonText>Informar</ButtonText>
                  <ButtonText>Problema</ButtonText>
                </ActionButton>
              </ButtonContent>
              <ButtonContent>
                <ActionButton>
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
            </CardRow>
          </CardActions>
        </Content>
      </Container>
    </Background>
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
  navigation: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
};
