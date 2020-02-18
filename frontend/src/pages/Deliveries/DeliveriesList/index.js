import React, { useCallback, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdAdd, MdVisibility, MdCreate, MdDeleteForever } from 'react-icons/md';
import { Form } from '@rocketseat/unform';

import api from '~/services/api';

import Title from '~/components/Title';
import Input from '~/components/Input';
import Button from '~/components/Button';
import Table, { ActionDropdown } from '~/components/Table';

import { Status } from './styles';

export default function DeliveriesList() {
  const [deliveries, setDeliveries] = useState([]);
  const [page, setPage] = useState(1);
  const [pageAmount, setPageAmount] = useState(1);

  const handleSearchSubmit = useCallback(() => {}, []);

  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get('/deliveries', {
          params: {
            page,
            quantity: 20,
            scope: ['deliveryList'],
          },
        });
        setDeliveries(response.data.data);
        setPageAmount(response.data.totalPages);
      } catch (err) {
        toast.error('Não foi possível carregar as entregas.');
      }
    }
    getData();
  }, [page]);

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
              CADASTRAR
            </Button>
          </Link>
        </div>
      </Title>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th style={{ width: '120px', textAlign: 'center' }}>Status</th>
            <th style={{ width: '100px' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map(delivery => (
            <tr key={delivery.id}>
              <td>#{`000${delivery.id}`.slice(-2)}</td>
              <td>{delivery.Recipient.name}</td>
              <td>{delivery.Deliveryman.name}</td>
              <td>{delivery.Recipient.city}</td>
              <td>{delivery.Recipient.state}</td>
              <td>
                <Status>{delivery.status}</Status>
              </td>
              <td>
                <ActionDropdown>
                  <ul>
                    <li>
                      <Button
                        icon={MdVisibility}
                        color="transparent"
                        textColor="#999999"
                        iconColor="#8E5BE8"
                        type="button"
                      >
                        Visualizar
                      </Button>
                    </li>
                    <li>
                      <Button
                        icon={MdCreate}
                        color="transparent"
                        textColor="#999999"
                        iconColor="#4D85EE"
                        type="button"
                      >
                        Editar
                      </Button>
                    </li>
                    <li>
                      <Button
                        icon={MdDeleteForever}
                        color="transparent"
                        textColor="#999999"
                        iconColor="#DE3B3B"
                        type="button"
                      >
                        Excluir
                      </Button>
                    </li>
                  </ul>
                </ActionDropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
