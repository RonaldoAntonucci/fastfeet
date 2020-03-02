import React, { useMemo } from 'react';
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
            <CardRow>
              <View>
                <CardLabel>DESTINATÁRIO</CardLabel>
                <CardValue>{item.Recipient.name}</CardValue>
              </View>
            </CardRow>
            <CardRow>
              <View>
                <CardLabel>ENDEREÇO DE ENTREGA</CardLabel>
                <CardValue>{item.Recipient.name}</CardValue>
              </View>
            </CardRow>
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
          <Card>
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
          <Card>
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
          </Card>
        </Content>
      </Container>
    </Background>
  );
}
