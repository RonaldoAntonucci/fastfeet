import React, { useContext, memo, useCallback } from 'react';
import PropTypes from 'prop-types';

import {
  MdKeyboardArrowLeft,
  MdFirstPage,
  MdKeyboardArrowRight,
  MdLastPage,
} from 'react-icons/md';

import { StyledPagination, StyledForm, StyledInput } from './styles';

function Pagination({ context }) {
  const {
    page: [page, setPage],
    pageAmount: [pageAmount],
    loading,
  } = useContext(context);

  const handleFirst = useCallback(() => {
    setPage(1);
  }, [setPage]);

  const handleLast = useCallback(() => {
    setPage(pageAmount);
  }, [pageAmount, setPage]);

  const handleNext = useCallback(() => {
    const next = page + 1;
    if (next < 1 || next > pageAmount) {
      return;
    }
    setPage(next);
  }, [page, pageAmount, setPage]);

  const handlePrevious = useCallback(() => {
    const next = page - 1;
    if (next < 1 || next > pageAmount) {
      return;
    }
    setPage(next);
  }, [page, pageAmount, setPage]);

  const handlePage = useCallback(
    ({ page: p }) => {
      if (p === page || p < 1 || p > pageAmount) {
        return;
      }
      setPage(p);
    },
    [page, pageAmount, setPage]
  );

  return (
    <StyledPagination>
      <button type="button" onClick={handleFirst} disabled={loading}>
        <MdFirstPage />
      </button>
      <button type="button" onClick={handlePrevious} disabled={loading}>
        <MdKeyboardArrowLeft />
      </button>
      <StyledForm onSubmit={handlePage}>
        <StyledInput
          disabled={loading}
          name="page"
          type="number"
          min="1"
          max={pageAmount}
          placeholder={page}
        />
      </StyledForm>
      <button type="button" onClick={handleNext} disabled={loading}>
        <MdKeyboardArrowRight />
      </button>
      <button type="button" onClick={handleLast} disabled={loading}>
        <MdLastPage />
      </button>
    </StyledPagination>
  );
}

Pagination.propTypes = {
  context: PropTypes.shape({
    page: PropTypes.shape([
      PropTypes.number.isRequired,
      PropTypes.func.isRequired,
    ]),
    pageAmount: PropTypes.shape([PropTypes.number.isRequired, PropTypes.func]),
  }).isRequired,
};

export default memo(Pagination);
