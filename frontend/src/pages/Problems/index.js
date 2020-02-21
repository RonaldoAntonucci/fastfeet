import React, { useEffect, useState, createContext } from 'react';

import { toast } from 'react-toastify';
import { MdVisibility, MdDeleteForever } from 'react-icons/md';

import api from '~/services/api';

import LoadingLine from '~/components/LoadingLine';
import Title from '~/components/Title';
import Pagination from '~/components/Pagination';
import Button from '~/components/Button';
import Table, { ActionDropdown } from '~/components/Table';

import colors from '~/styles/colors';

const PageContext = createContext(null);

export default function Problems() {
  const [loading, setLoading] = useState(false);
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(1);
  const [pageAmount, setPageAmount] = useState(1);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const {
          data: { data, totalPages },
        } = await api.get('/problems', {
          params: {
            page,
            quantity: 20,
            scopes: JSON.stringify(['deliveries']),
          },
        });
        setProblems(data);
        setPageAmount(totalPages);
      } catch (err) {
        toast.error('Não foi possível carregar os problemas.');
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [page]);
  return (
    <PageContext.Provider
      value={{
        page: [page, setPage],
        pageAmount: [pageAmount, setPageAmount],
        loading,
      }}
    >
      <Title title="Problemas na entrega" />
      <Pagination context={PageContext} />
      <Table>
        <thead>
          <tr>
            <th style={{ width: '50px' }}>Encomenda</th>
            <th>Problema </th>
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
            </tr>
          ) : (
            problems.map(
              ({ id, description, Delivery: { id: DeliveryId } }) => (
                <tr key={id}>
                  <td>#{DeliveryId}</td>
                  <td>
                    {description.length < 100
                      ? description
                      : `${description.slice(0, 80)} ...`}
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
                            icon={MdDeleteForever}
                            color="transparent"
                            textColor={colors.fontLigh}
                            iconColor={colors.red}
                            type="button"
                          >
                            Cancelar encomenda
                          </Button>
                        </li>
                      </ul>
                    </ActionDropdown>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </Table>
    </PageContext.Provider>
  );
}
