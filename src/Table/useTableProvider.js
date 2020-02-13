import { useEffect, useState } from 'react';
import queryString from 'query-string';
import sqp from 'search-query-parser';

const tableDefaults = {
  page: 1,
  result: [],
  facets: [],
  total_pages: 10,
};

const defaultPayload = {
  search_string: '',
  filter: '',
  facets: [],
  order_by: [],
  search_fields: [],
  page_size: 10,
  page: 1,
};

const useTableProvider = () => {
  const initializationRequestState = {};
  const initializationHistoryState = {};

  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const [updateFilterItems, setFilterCallback] = useState(null);
  const [updateTableItems, setRowCallback] = useState(null);

  const [historyState, setHistoryState] = useState({});
  const [rowRequestState, setRowRequestState] = useState({});
  const [filterRequestState, setFilterRequestState] = useState([]);

  const [router, setRouter] = useState({});
  const [tableData, setTableData] = useState(tableDefaults);
  const [filterData, setFilterData] = useState([]);
  const [requestFailed, setRequestFailed] = useState('');

  useEffect(() => {
    setIsLoading(true);
    if (isMounted && rowRequestState && Object.keys(rowRequestState).length > 0) {
      const { callback, onSuccess, onFail } = updateTableItems;
      const payload = { ...defaultPayload, ...rowRequestState };
      callback(payload, onSuccess, onFail);

      console.log('Fetch', payload);
    }
  }, [isMounted, rowRequestState]);

  useEffect(() => {
    if (isMounted && filterRequestState && filterRequestState.length > 0) {
      if (updateFilterItems && Object.keys(updateFilterItems).length > 0) {
        const { callback, onSuccess, onFail } = updateFilterItems;
        const payload = {
          ...defaultPayload,
          page_size: 1,
          facets: [...filterRequestState].map((key) => `${key}, count:0`),
        };

        callback(payload, onSuccess, onFail);
      }
    }
  }, [isMounted, filterRequestState]);

  useEffect(() => {
    if (Object.keys(router).length && Object.keys(historyState).length > 0) {
      const { location, history } = router;

      const buildSearchQuery = () => {
        const search = queryString.parse(location.search);
        const param = 'q';

        Object.assign(search, {
          [param]: Object.values(historyState).join(' '),
        });

        return `?${queryString.stringify(search)}`;
      };

      history.replace({ ...location, search: buildSearchQuery() });
    }
  }, [historyState]);

  return {
    isLoading,
    isMounted,
    tableData,
    filterData,
    updateFilterItems,
    updateTableItems,
    getTablePageCount: () => tableData.total_pages,
    getTablePage: () => tableData.page,
    getTableRowData: () => tableData.result,
    getFilterData: () => tableData.facets,
    enableHistoryState: ({ history, location, prefix }) => {
      setRouter({ history, location, prefix });
    },
    getHistoryState: () => {
      if (router.location) {
        const { location } = router;
        const { q: tableState } = queryString.parse(location.search);
        const searchQueryObj = sqp.parse(tableState, {
          keywords: ['sort', 'page', 'filter'],
        });

        if (typeof searchQueryObj === 'string') {
          return { text: searchQueryObj };
        }

        return searchQueryObj;
      }
      return {};
    },
    loadFilterItems: (sortKeys) => {
      setFilterRequestState([...sortKeys]);
    },
    requestFailedMessage: () => requestFailed,
    parentReady: () => { setIsMounted(true); },
    registerRowFetchCallback: (callback) => {
      const onSuccess = (response) => {
        setIsLoading(false);
        setTableData(response);
        setRequestFailed('');
      };

      const onFail = (error) => {
        setIsLoading(false);
        setTableData(tableDefaults);
        setRequestFailed(error);
      };

      setRowCallback({ callback, onSuccess, onFail });
    },
    registerFilterFetchCallback: (callback) => {
      const onSuccess = (response) => {
        setFilterData(response);
        setRequestFailed('');
      };

      const onFail = (error) => {
        setFilterData([]);
        setRequestFailed(error);
      };

      setFilterCallback({ callback, onSuccess, onFail });
    },
    update: (request, history) => {
      if (request) {
        const updateRequest = Object.assign(initializationRequestState, rowRequestState, request);
        console.log(updateRequest);

        setRowRequestState(updateRequest);
      }
      if (history) {
        const updateHistory = Object.assign(initializationHistoryState, historyState, history);
        console.log(updateHistory);

        setHistoryState(updateHistory);
      }
    },
  };
};

export default useTableProvider;
