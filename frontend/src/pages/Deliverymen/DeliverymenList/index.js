import React, { useCallback, useEffect, useState, createContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdCreate, MdDeleteForever } from 'react-icons/md';

import api from '~/services/api';

import LoadingLine from '~/components/LoadingLine';
import Title from '~/components/Title';
import Pagination from '~/components/Pagination';
import Button from '~/components/Button';
import Table, { ActionDropdown } from '~/components/Table';

import { Avatar } from './styles';

import colors from '~/styles/colors';

const PageContext = createContext(null);

export default function DeliverymenList() {
  const [loading, setLoading] = useState(false);
  const [deliverymen, setDeliverymen] = useState([]);
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
        setLoading(true);
        const {
          data: { data, totalPages },
        } = await api.get('/deliverymen', {
          params: {
            page,
            quantity: 20,
            scope: ['deliveryList'],
            q: search,
          },
        });
        setDeliverymen(data);
        setPageAmount(totalPages);
      } catch (err) {
        toast.error('Não foi possível carregar os entregadores.');
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [page, search]);

  return (
    <PageContext.Provider
      value={{
        page: [page, setPage],
        pageAmount: [pageAmount, setPageAmount],
        loading,
      }}
    >
      <Title
        title="Gerenciando entregadores"
        handleSearchSubmit={handleSearchSubmit}
        buttonLink="deliverymen/create"
        loading={loading}
      />
      <Pagination context={PageContext} />
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>Email</th>
            <th style={{ width: '100px' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td>
                <LoadingLine />
              </td>
              <td>
                <LoadingLine />
              </td>
              <td>
                <LoadingLine />
              </td>
              <td>
                <LoadingLine />
              </td>
              <td>
                <LoadingLine />
              </td>
            </tr>
          ) : (
            deliverymen.map(deliveryman => (
              <tr key={deliveryman.id}>
                <td>#{deliveryman.id}</td>
                <td>
                  <Avatar
                    src={
                      deliveryman.avatar_url
                        ? deliveryman.avatar_url
                        : 'https://api.adorable.io/avatars/50/abott@adorable.png'
                    }
                    alt={deliveryman.name}
                  />
                </td>
                <td>{deliveryman.name}</td>
                <td>{deliveryman.email}</td>
                <td>
                  <ActionDropdown>
                    <ul>
                      <li>
                        <Link to={`/deliverymen/${deliveryman.id}`}>
                          <Button
                            icon={MdCreate}
                            color="transparent"
                            textColor={colors.fontLigh}
                            iconColor={colors.blue}
                            type="button"
                          >
                            Editar
                          </Button>
                        </Link>
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
            ))
          )}
        </tbody>
      </Table>
    </PageContext.Provider>
  );
}
