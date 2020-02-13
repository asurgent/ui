import { useState, useEffect } from 'react';
import buildPaginationArray from './helpers';

const PAGINATION_DELTA = 5;

const usePaginationHook = (tableHook, props) => {
  const [isReady, setIsReady] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationList, setPaginationList] = useState([]);
  const [totalPageCount, setTotalPageCount] = useState(1);

  // Set initail value from history-state
  useEffect(() => {
    const state = tableHook.getHistoryState();
    const { page } = state;

    if (page !== undefined) {
      setCurrentPage(parseInt(page, 10));
    }

    setIsReady(true);
  }, []);

  // set total page count when its passed trough props
  useEffect(() => {
    setTotalPageCount(tableHook.tableData.total_pages);
  }, [tableHook.getTablePageCount()]);

  // Rebuild pagination list when user paginates or a new totalPageCount gets set by a request
  useEffect(() => {
    const newList = buildPaginationArray(currentPage, totalPageCount, PAGINATION_DELTA);
    setPaginationList(newList);
  }, [currentPage, tableHook.getTablePageCount()]);

  // Perform an table update whenever user searches
  useEffect(() => {
    if (isReady) {
      const request = { page: currentPage };
      const history = { page: `page:${currentPage}` };

      tableHook.update(request, history);
    }
  }, [isReady, currentPage]);

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
