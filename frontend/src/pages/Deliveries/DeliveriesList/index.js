import React, { useCallback, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  MdAdd,
  MdVisibility,
  MdCreate,
  MdDeleteForever,
  MdSearch,
  MdKeyboardArrowLeft,
  MdFirstPage,
  MdKeyboardArrowRight,
  MdLastPage,
} from 'react-icons/md';
import { Form } from '@rocketseat/unform';
import { usePagination } from '~/hooks';

import api from '~/services/api';

import Title from '~/components/Title';
import Input from '~/components/Input';
import Button from '~/components/Button';
import Table, {
  ActionDropdown,
  TablePagination,
  PaginationInput,
} from '~/components/Table';

import colors from '~/styles/colors';

import { Status } from './styles';

export default function DeliveriesList() {
  const [deliveries, setDeliveries] = useState([]);
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
    <>
      <Title>
        <h1>Gerenciando encomendas</h1>

        <div>
          <Form onSubmit={handleSearchSubmit}>
            <button type="submit">
              <MdSearch color={colors.fontLigh} />
            </button>

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
        <div>
          <TablePagination>
            <button type="button" onClick={handleFirst}>
              <MdFirstPage />
            </button>
            <button type="button" onClick={handlePrevious}>
              <MdKeyboardArrowLeft />
            </button>
            <Form onSubmit={handlePage} initialData={{ page }}>
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
