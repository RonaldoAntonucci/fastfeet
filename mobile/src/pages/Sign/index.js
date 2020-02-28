import React, { useRef } from 'react';

import { Form } from '@unform/mobile';
import Input from '~/components/Input';

import { Container, Logo, SignButton } from './styles';

export default function Sign() {
  const formRef = useRef(null);

  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <Container>
      <Logo />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="id"
          type="string"
          placeholder="Informe seu ID de cadastro"
        />
        <SignButton
          title="Sign in"
          onPress={() => formRef.current.submitForm()}
        >
          Entrar no sistema
        </SignButton>
      </Form>
    </Container>
  );
}
