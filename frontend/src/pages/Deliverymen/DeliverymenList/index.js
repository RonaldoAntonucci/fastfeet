import React, { useCallback, useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { Form } from '@rocketseat/unform';
import {
  MdVisibility,
  MdCreate,
  MdDeleteForever,
  MdKeyboardArrowLeft,
  MdFirstPage,
  MdKeyboardArrowRight,
  MdLastPage,
} from 'react-icons/md';

import { usePagination } from '~/hooks';

import api from '~/services/api';

import Title from '~/components/Title';
import Button from '~/components/Button';
import Table, {
  ActionDropdown,
  TablePagination,
  PaginationInput,
} from '~/components/Table';

import colors from '~/styles/colors';

export default function DeliverymenList() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [page, setPage] = useState(1);
  const [pageAmount, setPageAmount] = useState(1);
  const [search, setSearch] = useState('');

  const {
    handleFirst,
    handleLast,
    handleNext,
    handlePrevious,
    handlePage,
  } = usePagination({ page, setPage, pageAmount });

  const handleSearchSubmit = useCallback(data => {
    setPage(1);
    setSearch(data.search);
  }, []);

  useEffect(() => {
    async function getData() {
      try {
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
      }
    }
    getData();
  }, [page, search]);

  return (
    <>
      <Title
        title="Gerenciando entregadores"
        handleSearchSubmit={handleSearchSubmit}
        buttonLink="deliverymen/create"
      />
      <div>
        <TablePagination>
          <button type="button" onClick={handleFirst}>
            <MdFirstPage />
          </button>
          <button type="button" onClick={handlePrevious}>
            <MdKeyboardArrowLeft />
          </button>
          <Form onSubmit={handlePage}>
            <PaginationInput
              name="page"
              type="number"
              min="1"
              max={pageAmount}
              placeholder={page}
            />
          </Form>
          <button type="button" onClick={handleNext}>
            <MdKeyboardArrowRight />
          </button>
          <button type="button" onClick={handleLast}>
            <MdLastPage />
          </button>
        </TablePagination>
      </div>
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
          {deliverymen.map(deliveryman => (
            <tr key={deliveryman.id}>
              <td>#{`000${deliveryman.id}`.slice(-2)}</td>
              <td>foto</td>
              <td>{deliveryman.name}</td>
              <td>{deliveryman.email}</td>
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
    </>
  );
}
