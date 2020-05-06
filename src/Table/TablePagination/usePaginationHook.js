import { useState, useEffect } from 'react';
import buildPaginationArray from './helpers';

const PAGINATION_DELTA = 5;

const usePaginationHook = (tableHook, props) => {
  // Keeps track of when component has been mounted.
  // After its been mounted and set to true, the initail state is set
  const [isReady, setIsReady] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableHook.isReady]);

  // Listening to change triggers from other hooks
  // If this happens, we set the interal state to isResetting
  // And ONLY perform a tableHook.update from this effect,
  // and not in the "poppulate" effect bellow
  useEffect(() => {
    if (tableHook.isReady && tableHook.hasTriggers()) {
      const { page } = tableHook.thirdPartyTrigger;
      if (page !== undefined) {
        const request = { page: 1 };
        const history = { page: `page:${1}` };

        tableHook.update(request, history);
        setCurrentPage(parseInt(page, 10));
        setIsResetting(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableHook.hasTriggers()]);


  // After this render-cycle, reset the reset-state so
  // hook will trigger updates on user-actions again
  useEffect(() => {
    if (isResetting) {
      setIsResetting(false);
    }
  }, [isResetting]);

  // Poppulate tabelHook with state for requests and URL
  useEffect(() => {
    // Check if we are in a reset-cycle initated by tableHook.hasTriggers()
    // In that case DONT trigger another tableHook.update since it will use the old page value
    if (isReady && isResetting === false) {
      const request = { page: currentPage };
      const history = { page: `page:${currentPage}` };

      tableHook.update(request, history);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, currentPage]);

  // Update totalPageCount if request-response changes
  useEffect(() => {
    setTotalPageCount(tableHook.getRequestedPageCount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableHook.getRequestedPageCount()]);

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
    hasPagination: () => paginationList.length > 1,
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
