import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import schema from './validator';

import Button from '~/components/Button';
import colors from '~/styles/colors';
import { Form, Input, InputMask } from '~/components/Form';

import { TitleContainer, Content } from './styles';

export default function RecipientForm() {
  const handleSubmit = useCallback(async data => {
    console.log(data);
  }, []);
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

          <Button type="submit" form="recipientForm" icon={MdDone}>
            SALVAR
          </Button>
        </div>
      </TitleContainer>
      <Form id="recipientForm" schema={schema} onSubmit={handleSubmit}>
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
            min="0"
          />

          <Input label="Complemento" name="complement" type="text" />

          <Input label="Cidade" name="city" type="text" />

          <Input label="Estado" name="state" type="text" />

          <InputMask
            label="CEP"
            name="zip"
            type="text"
            placeholder="00000-000"
            mask="99999-999"
          />
        </Content>
      </Form>
    </>
  );
}
