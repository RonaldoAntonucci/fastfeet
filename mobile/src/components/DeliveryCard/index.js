import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Progress from '~/components/DeliveryProgress';

import {
  Container,
  Content,
  TitleContainer,
  TitleIcon,
  TitleText,
  Footer,
  FooterContent,
  FooterContentData,
  FooterLabel,
  FooterInfo,
  FooterButton,
  FooterButtonTitle,
} from './styles';

const DeliveryCard = ({ data, handleDetails }) => {
  return (
    <Container>
      <Content>
        <TitleContainer>
          <TitleIcon />
          <TitleText>Entrega {data.id}</TitleText>
        </TitleContainer>
        <Progress status={data.status} />
      </Content>
      <Footer>
        <FooterContentData>
          <FooterLabel>Data</FooterLabel>
          <FooterInfo>{data.createdAt}</FooterInfo>
        </FooterContentData>
        <FooterContent style={{ flexWrap: 'nowrap' }}>
          <FooterLabel>Cidade</FooterLabel>
          <FooterInfo>{data.Recipient.city}</FooterInfo>
        </FooterContent>
        <FooterButton onPress={handleDetails}>
          <FooterContent style={{ flexShrink: 1 }}>
            <FooterButtonTitle>Ver detalhes</FooterButtonTitle>
          </FooterContent>
        </FooterButton>
      </Footer>
    </Container>
  );
};

DeliveryCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
    status: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    Recipient: PropTypes.shape({ city: PropTypes.string }),
  }).isRequired,

  handleDetails: PropTypes.func.isRequired,
};

export default memo(DeliveryCard);
