import React, { useRef, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Form } from '@unform/mobile';
import Input from '~/components/Input';

import { signInRequest, setLoading } from '~/store/modules/auth/actions';

import { Container, Logo, SignButton } from './styles';

const SignIn = () => {
  const formRef = useRef(null);
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    ({ id }) => {
      dispatch(signInRequest(id));
    },
    [dispatch]
  );

  // useEffect(() => {
  //   dispatch(setLoading(true));
  // }, [dispatch]);

  return (
    <Container>
      <Logo />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="id"
          type="string"
          placeholder="Informe seu ID de cadastro"
          autoCorrect={false}
          autCapitalize="none"
          returnKeyType="next"
        />
        <SignButton
          loading={loading}
          title="Sign in"
          onPress={() => formRef.current.submitForm()}
        >
          Entrar no sistema
        </SignButton>
      </Form>
    </Container>
  );
};

export default SignIn;
