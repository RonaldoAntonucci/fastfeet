import React, { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';

import ProgressSteps from '~/components/ProgressSteps';

import {
  Container,
  Content,
  TitleContainer,
  TitleIcon,
  TitleText,
  Footer,
  FooterContent,
  FooterLabel,
  FooterInfo,
  FooterButton,
  FooterButtonTitle,
} from './styles';

function DeliveryItem({ data, handleDetails }) {
  const formatedCreatedAt = useMemo(
    () =>
      data.createdAt &&
      format(new Date(data.createdAt), "dd'/'MM'/'y", {
        locale: pt,
      }),
    [data.createdAt]
  );

  const currentStep = useMemo(() => {
    const { status } = data;
    switch (status) {
      case 'ENTREGUE':
        return 2;
      case 'RETIRADA':
        return 1;
      default:
        return 0;
    }
  }, [data]);

  return (
    <Container>
      <Content>
        <TitleContainer>
          <TitleIcon />
          <TitleText>{data.product}</TitleText>
        </TitleContainer>
        <ProgressSteps
          labels={['Aguardando Retirada', 'Retirada', 'Entregue']}
          current={currentStep}
        />
      </Content>
      <Footer>
        <FooterContent>
          <FooterLabel>Data</FooterLabel>
          <FooterInfo>{formatedCreatedAt}</FooterInfo>
        </FooterContent>
        <FooterContent>
          <FooterLabel>Cidade</FooterLabel>
          <FooterInfo>{data.Recipient ? data.Recipient.city : ''}</FooterInfo>
        </FooterContent>
        <FooterButton onPress={handleDetails}>
          <FooterContent>
            <FooterButtonTitle>Ver detalhes</FooterButtonTitle>
          </FooterContent>
        </FooterButton>
      </Footer>
    </Container>
  );
}

DeliveryItem.propTypes = {
  data: PropTypes.shape({
    product: PropTypes.string.isRequired,
    status: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    Recipient: PropTypes.shape({ city: PropTypes.string }),
  }).isRequired,

  handleDetails: PropTypes.func.isRequired,
};

export default memo(DeliveryItem);
