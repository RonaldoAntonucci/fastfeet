import React, { useCallback, useEffect, useState, createContext } from 'react';

import { toast } from 'react-toastify';
import { MdCreate, MdDeleteForever } from 'react-icons/md';

import api from '~/services/api';

import LoadingLine from '~/components/LoadingLine';
import Title from '~/components/Title';
import Pagination from '~/components/Pagination';
import Button from '~/components/Button';
import Table, { ActionDropdown } from '~/components/Table';

import colors from '~/styles/colors';

const PageContext = createContext(null);

export default function RecipientsList() {
  const [loading, setLoading] = useState(false);
  const [recipients, setRecipients] = useState([]);
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
        } = await api.get('/recipients', {
          params: {
            page,
            quantity: 20,
            q: search,
          },
        });
        setRecipients(data);
        setPageAmount(totalPages);
      } catch (err) {
        toast.error('Não foi possível carregar os destinatários.');
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
        title="Gerenciando destinatários"
        handleSearchSubmit={handleSearchSubmit}
        buttonLink="recipients/create"
        loading={loading}
      />
      <Pagination context={PageContext} />
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
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
            </tr>
          ) : (
            recipients.map(({ id, name, street, number, city, state }) => (
              <tr key={id}>
                <td>#{id}</td>
                <td>{name}</td>
                <td>{`${street}, ${number}, ${city} - ${state}`}</td>
                <td>
                  <ActionDropdown>
                    <ul>
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
            ))
          )}
        </tbody>
      </Table>
    </PageContext.Provider>
  );
}
