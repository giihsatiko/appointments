import { useMemo, useState } from 'react';

export function usePagination<T>(data: T[] = [], itemsPerPage = 10) {
  const [requestedPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
  const currentPage = Math.min(requestedPage, totalPages);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;

    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  return {
    currentPage,
    totalPages,
    paginatedData,
    setCurrentPage,
  };
}
