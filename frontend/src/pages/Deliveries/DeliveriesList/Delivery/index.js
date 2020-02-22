import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

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
  const formatedStartDate = useMemo(
    () => start_date && format(new Date(start_date), "dd'/'MM'/'y"),
    [start_date]
  );

  const formatedEndDate = useMemo(
    () => end_date && format(new Date(end_date), "dd'/'MM'/'y"),
    [end_date]
  );

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
          {formatedStartDate}
        </span>
        <span>
          <strong>Entrega: </strong>
          {formatedEndDate}
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
