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
  return <h1>RECIPIENTS</h1>;
}
