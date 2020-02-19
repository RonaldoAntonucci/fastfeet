import React, { useCallback, useEffect, useState, createContext } from 'react';

import { toast } from 'react-toastify';
import { MdVisibility, MdCreate, MdDeleteForever } from 'react-icons/md';

import api from '~/services/api';

import Title from '~/components/Title';
import Pagination from '~/components/Pagination';
import Button from '~/components/Button';
import Table, { ActionDropdown } from '~/components/Table';

import colors from '~/styles/colors';

import { Status } from './styles';

const PageContext = createContext(null);

export default function DeliveriesList() {
  const [deliveries, setDeliveries] = useState([]);
  const [page, setPage] = useState(1);
  const [pageAmount, setPageAmount] = useState(1);
  const [search, setSearch] = useState('');

  const handleSearchSubmit = useCallback(data => {
    setPage(1);
    setSearch(data.search);
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const {
          data: { data, totalPages },
        } = await api.get('/deliveries', {
          params: {
            page,
            quantity: 20,
            scope: ['deliveryList'],
            q: search,
          },
        });
        setDeliveries(data);
        setPageAmount(totalPages);
      } catch (err) {
        toast.error('Não foi possível carregar as entregas.');
      }
    }
    getData();
  }, [page, search]);

  return (
    <PageContext.Provider
      value={{ page: [page, setPage], pageAmount: [pageAmount, setPageAmount] }}
    >
      <Title
        title="Gerenciando encomendas"
        handleSearchSubmit={handleSearchSubmit}
        buttonLink="/deliveries/create"
      />
      <Pagination context={PageContext} />
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
                        textColor={colors.fontLigh}
                        iconColor={colors.primary}
                        type="button"
                      >
                        Visualizar
                      </Button>
                    </li>
                    <li>
                      <Button
                        icon={MdCreate}
                        color="transparent"
                        textColor={colors.fontLigh}
                        iconColor={colors.blue}
                        type="button"
                      >
                        Editar
                      </Button>
                    </li>
                    <li>
                      <Button
                        icon={MdDeleteForever}
                        color="transparent"
                        textColor={colors.fontLigh}
                        iconColor={colors.red}
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
    </PageContext.Provider>
  );
}
