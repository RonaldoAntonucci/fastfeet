import React, { useRef, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';

import api from '~/services/api';

import Background from '~/components/Background';

import { FormContent, Form, Input, SubmitButton } from './styles';

export default function ProblemsForm({
  route: {
    params: { deliveryId },
  },
}) {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async ({ description }) => {
      if (description.length > 400 || description.length < 10) {
        Alert.alert('Máximo de 400 caracteres.');
        return;
      }
      try {
        setLoading(true);
        await api.post(`/deliveries/${deliveryId}/problems`, { description });
        setLoading(false);
        Alert.alert('Problema cadastrado com successo');
        formRef.current.clearField('description');
      } catch (err) {
        setLoading(false);
        Alert.alert('Erro ao cadastrar o problema');
      }
    },
    [deliveryId]
  );

  return (
    <Background>
      <FormContent>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="description"
            placeholder="Inclua aqui o problema que ocorreu na entrega"
            type="string"
            autCapitalize="none"
            returnKeyType="next"
            multiline
            textAlignVertical="top"
          />
          <SubmitButton
            loading={loading}
            onPress={() => formRef.current.submitForm()}
          >
            Enviar
          </SubmitButton>
        </Form>
      </FormContent>
    </Background>
  );
}

ProblemsForm.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ deliveryId: PropTypes.string.isRequired })
      .isRequired,
  }).isRequired,
};
