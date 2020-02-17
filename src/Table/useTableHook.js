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

const useTableHook = () => {
  // Holds state changes that are set simontainusly wihout a render inbetween
  // A rerender will empty these, but without a rerender setState for rowRequestState &
  // filterRequestState would overwrite previous value if no render is executed inbetween
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
  const [pageSize, setPageSize] = useState(10);
  const [tableData, setTableData] = useState(tableDefaults);
  const [filterData, setFilterData] = useState([]);
  const [requestFailed, setRequestFailed] = useState('');

  const getQueryParamKey = (queryPrefix) => `${queryPrefix ? `${queryPrefix}_q` : 'q'}`;

  // Is triggered whenever the state is changed by a state-changing hook as pagination, filter etc.
  useEffect(() => {
    setIsLoading(true);

    if (isMounted && rowRequestState && Object.keys(rowRequestState).length > 0) {
      if (updateTableItems && Object.keys(updateTableItems).length > 0) {
        const { callback, onSuccess, onFail } = updateTableItems;

        const payload = {
          ...defaultPayload,
          ...rowRequestState,
          page_size: pageSize,
          facets: [...filterRequestState].map(({ facetKey }) => `${facetKey}, count:0`),
        };
        callback(payload, onSuccess, onFail);
      }
    }
  }, [isMounted, rowRequestState]);

  // Is triggered when filter is opened for the first time
  useEffect(() => {
    if (isMounted && filterRequestState && filterRequestState.length > 0) {
      if (updateFilterItems && Object.keys(updateFilterItems).length > 0) {
        const { callback, onSuccess, onFail } = updateFilterItems;
        const payload = {
          ...defaultPayload,
          page_size: 1,
          facets: [...filterRequestState].map(({ facetKey }) => `${facetKey}, count:0`),
        };

        callback(payload, onSuccess, onFail);
      }
    }
  }, [isMounted, filterRequestState]);

  // Is triggered when the filter-state is updated
  useEffect(() => {
    if (isMounted && Object.keys(router).length && Object.keys(historyState).length > 0) {
      const { location, history, queryPrefix } = router;

      const buildSearchQuery = () => {
        const search = queryString.parse(location.search);
        const param = getQueryParamKey(queryPrefix);

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
    setPageSize,
    getTablePageCount: () => tableData.total_pages,
    getTablePage: () => tableData.page,
    getTableRowData: () => tableData.result,
    getSearchedFacets: () => tableData.facets,
    getFilterData: () => filterData.facets,
    enableHistoryState: ({ history, location, queryPrefix }) => {
      setRouter({ history, location, queryPrefix });
    },
    getHistoryState: () => {
      if (router.location) {
        const { location, queryPrefix } = router;
        const param = getQueryParamKey(queryPrefix);
        const { [param]: tableState } = queryString.parse(location.search);
        // Use SQP to parse query-string and pick out the listed keywords below.
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
        setRowRequestState(updateRequest);
      }
      if (history) {
        const updateHistory = Object.assign(initializationHistoryState, historyState, history);
        setHistoryState(updateHistory);
      }
    },
  };
};

export default useTableHook;
