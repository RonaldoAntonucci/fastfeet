import React, { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import api from '~/services/api';
import history from '~/services/history';

import schema from './validator';

import Button from '~/components/Button';
import colors from '~/styles/colors';
import { Form, Input } from '~/components/Form';

import { TitleContainer, Content } from './styles';

export default function DeliveryForm({ match }) {
  const { id } = match.params;
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState();

  useEffect(() => {
    if (id) {
      const getData = async () => {
        try {
          const response = await api.get(`/deliveries/${id}`);
          if (!response.data) {
            toast.error('Entrega inexistente.');
            history.push('/deliveries');
          }
          setInitialData(response.data);
        } catch (err) {
          toast.error('Não foi possível carregar a Entrega.');
          history.push('/deliveries');
        }
      };
      getData();
    }
  }, [id]);

  const handleSubmit = useCallback(
    async data => {
      try {
        setLoading(true);
        // const method = id ? api.put : api.post;

        console.log(data);
        setLoading(false);

        // history.push('/recipients');
      } catch (err) {
        toast.error(
          `Não foi possível ${id ? 'editar' : 'cadastrar'} a entrega.`
        );
        setLoading(false);
      }
    },
    [id]
  );

  return (
    <>
      <TitleContainer>
        <h1>{id ? 'Edição' : 'Cadastro'} de entregas</h1>
        <div>
          <Link to="/deliveries">
            <Button color={colors.grey} icon={MdKeyboardArrowLeft}>
              VOLTAR
            </Button>
          </Link>

          <Button type="submit" form="deliveryForm" icon={MdDone}>
            SALVAR
          </Button>
        </div>
      </TitleContainer>
      <Form
        id="deliveryForm"
        schema={schema}
        onSubmit={handleSubmit}
        loading={loading}
        initialData={initialData}
      >
        <Content>
          <Input
            disabled={loading}
            label="Destinatário"
            name="recipient"
            type="text"
            placeholder="Selecione o Destinatário"
          />

          <Input
            disabled={loading}
            label="Entregador"
            name="deliveryman"
            type="text"
            placeholder="Selecione o Entregador"
          />

          <Input
            disabled={loading}
            label="Nome do produto"
            name="product"
            type="text"
            placeholder="Digite o nome do produto"
          />
        </Content>
      </Form>
    </>
  );
}

DeliveryForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

DeliveryForm.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null,
    }),
  }),
};
