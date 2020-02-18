import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import { Container, Img, SignInput } from './styles';
import logo from '~/assets/logo.png';

import { signInRequest } from '~/store/modules/auth/actions';
import Label from '~/components/Label';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é Obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispath = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const handleSubmit = useCallback(
    ({ email, password }) => dispath(signInRequest(email, password)),
    [dispath]
  );

  return (
    <Container>
      <Img src={logo} alt="FastFeet" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Label>SEU E-MAIL</Label>
        <SignInput name="email" type="email" placeholder="exemplo@email.com" />

        <Label>SUA SENHA</Label>
        <SignInput name="password" type="password" placeholder="************" />

        <button type="submit">
          {loading ? 'Carregando...' : 'Entrar no sistema'}
        </button>
      </Form>
    </Container>
  );
}
