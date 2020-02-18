import { useState, useEffect } from 'react';
import buildPaginationArray from './helpers';

const PAGINATION_DELTA = 5;

const usePaginationHook = (tableHook, props) => {
  // Keeps track of when component has been mounted.
  // After its been mounted and set to true, the initail state is set
  const [isReady, setIsReady] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [paginationList, setPaginationList] = useState([]);
  const [totalPageCount, setTotalPageCount] = useState(1);

  // Initial setter. This will trigger Poppulate effect as well.
  useEffect(() => {
    if (tableHook.isReady) {
      const state = tableHook.getHistoryState();
      const { page } = state;

      if (page !== undefined) {
        setCurrentPage(parseInt(page, 10));
      }

      setIsReady(true);
    }
  }, [tableHook.isReady]);

  // Poppulate tabelHook with state for requests and URL
  useEffect(() => {
    if (isReady) {
      const request = { page: currentPage };
      const history = { page: `page:${currentPage}` };

      tableHook.update(request, history);
    }
  }, [isReady, currentPage]);

  // Update totalPageCount if request-response changes
  useEffect(() => {
    setTotalPageCount(tableHook.tableData.total_pages);
  }, [tableHook.getTablePageCount()]);

  // Rebuild pagination list when user paginates or a new totalPageCount
  useEffect(() => {
    const newList = buildPaginationArray(currentPage, totalPageCount, PAGINATION_DELTA);
    setPaginationList(newList);
  }, [currentPage, totalPageCount]);


  const paginate = (requestedPage) => {
    const page = Math.max(1, Math.min(totalPageCount, requestedPage));
    if (page !== currentPage) {
      if (props.onPagination) {
        props.onPagination(page);
      }
      setCurrentPage(page);
    }
  };

  return {
    isReady,
    currentPage: () => currentPage,
    getTotalPageCount: () => totalPageCount,
    setTotalPageCount: (pageCount) => setTotalPageCount(pageCount),
    onPaginate: () => tableHook.update({ page: currentPage }),
    getActivePage: () => currentPage,
    getPaginationList: () => paginationList,
    nextPage: () => {
      const page = currentPage + 1;
      paginate(page);
    },
    previousPage: () => {
      const page = currentPage - 1;
      paginate(page);
    },
    setPage: (page) => {
      paginate(page);
    },
  };
};

export default usePaginationHook;
