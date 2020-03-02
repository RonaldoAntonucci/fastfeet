import React, { useRef } from 'react';
import Container from '~/components/PageContainer';

import { FormContent, Form, Input, SubmitButton } from './styles';

export default function ProblemsForm({ navigation }) {
  const formRef = useRef(null);

  return (
    <Container
      scroll
      title="Informar Problema"
      handleBack={() => navigation.goBack()}
    >
      <FormContent>
        <Form ref={formRef}>
          <Input
            name="problem"
            placeholder="Inclua aqui o problema que ocorreu na entrega"
            type="string"
            autCapitalize="none"
            returnKeyType="next"
            multiline
            textAlignVertical="top"
          />
          <SubmitButton>Enviar</SubmitButton>
        </Form>
      </FormContent>
    </Container>
  );
}
