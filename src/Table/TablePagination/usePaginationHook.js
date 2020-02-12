import { useState } from 'react';

const usePaginationHook = (tableHook) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationList, setPaginationList] = useState([]);
  const [totalPageCount, setTotalPageCount] = useState(1);

  return {
    currentPage: () => currentPage,
    getTotalPageCount: () => totalPageCount,
    onPaginate: () => tableHook.update({ page: currentPage }),
  };
};

export default usePaginationHook;
