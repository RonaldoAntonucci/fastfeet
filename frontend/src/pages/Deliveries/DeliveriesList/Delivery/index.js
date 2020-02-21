import React, { memo } from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  AdressContainer,
  DatesContainer,
  SignatureContainer,
} from './styles';

function Delivery({
  delivery: {
    start_date,
    end_date,
    Recipient: { name, street, number, city, state, zip },
    signature,
  },
}) {
  return (
    <Container>
      <AdressContainer>
        <span>
          {street}, {number}
        </span>
        <span>
          {city} - {state}
        </span>
        <span>{zip}</span>
      </AdressContainer>
      <hr />
      <DatesContainer>
        <span>
          <strong>Retirada: </strong>
          {start_date}
        </span>
        <span>
          <strong>Retirada: </strong>
          {end_date}
        </span>
      </DatesContainer>
      <hr />
      <SignatureContainer>
        <strong>Assinatura do destinatário</strong>
        {signature && signature.url && (
          <img src={signature.url} alt={`${name} signature`} />
        )}
      </SignatureContainer>
    </Container>
  );
}

Delivery.propTypes = {
  delivery: PropTypes.shape({
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    Recipient: PropTypes.shape({
      name: PropTypes.string.isRequired,
      street: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
    }).isRequired,
    signature: PropTypes.shape({ url: PropTypes.string }),
  }).isRequired,
};

export default memo(Delivery);
