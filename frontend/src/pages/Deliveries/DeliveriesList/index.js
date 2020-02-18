import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { MdAdd } from 'react-icons/md';

import { Form } from '@rocketseat/unform';
import Title from '~/components/Title';
import Input from '~/components/Input';
import Button from '~/components/Button';

// import { Container } from './styles';

export default function DeliveriesList() {
  const handleSearchSubmit = useCallback(() => {}, []);

  return (
    <>
      <Title>
        <h1>Gerenciando encomendas</h1>

        <div>
          <Form onSubmit={handleSearchSubmit}>
            <Input
              type="text"
              name="search"
              placeholder="Buscar por encomendas"
            />
          </Form>
          <Link to="/deliveries/create">
            <Button icon={MdAdd} type="button">
              Cadastrar
            </Button>
          </Link>
        </div>
      </Title>
    </>
  );
}
