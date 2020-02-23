import React from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';

import Button from '~/components/Button';
import colors from '~/styles/colors';
import { Form, Input } from '~/components/Form';

import { TitleContainer, Content } from './styles';

export default function RecipientForm() {
  return (
    <>
      <TitleContainer>
        <h1>Edição de destinatário</h1>
        <div>
          <Link to="/recipients">
            <Button color={colors.grey} icon={MdKeyboardArrowLeft}>
              VOLTAR
            </Button>
          </Link>

          <Button icon={MdDone}>SALVAR</Button>
        </div>
      </TitleContainer>
      <Form>
        <Content>
          <Input
            label="Nome"
            name="name"
            type="text"
            placeholder="Digite o nome completo"
          />

          <Input
            label="Rua"
            name="street"
            type="text"
            placeholder="Digite a rua"
          />

          <Input
            label="Número"
            name="number"
            type="number"
            placeholder="Digite o número"
          />

          <Input label="Complemento" name="complement" type="text" />

          <Input label="Cidade" name="city" type="text" />

          <Input label="Estado" name="state" type="text" />

          <Input label="CEP" name="city" type="text" placeholder="00000-000" />
        </Content>
      </Form>
    </>
  );
}
