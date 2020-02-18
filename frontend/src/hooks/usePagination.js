import { useCallback, useMemo } from 'react';

function usePagination({ page = 1, setPage = () => {}, pageAmount = 1 }) {
  const currentPage = useMemo(() => page, [page]);
  const currentPageAmount = useMemo(() => pageAmount, [pageAmount]);

  const handleFirst = useCallback(() => {
    setPage(1);
  }, [setPage]);

  const handleLast = useCallback(() => {
    setPage(currentPageAmount);
  }, [currentPageAmount, setPage]);

  const handleNext = useCallback(() => {
    const next = currentPage + 1;
    if (next < 1 || next > currentPageAmount) {
      return;
    }
    setPage(next);
  }, [currentPage, currentPageAmount, setPage]);

  const handlePrevious = useCallback(() => {
    const next = currentPage - 1;
    if (next < 1 || next > currentPageAmount) {
      return;
    }
    setPage(next);
  }, [currentPage, currentPageAmount, setPage]);

  const handlePage = useCallback(
    ({ page: p }) => {
      if (p === currentPage || p < 1 || p > currentPageAmount) {
        return;
      }
      setPage(p);
    },
    [currentPage, currentPageAmount, setPage]
  );

  return { handleFirst, handleLast, handleNext, handlePrevious, handlePage };
}

export default usePagination;
