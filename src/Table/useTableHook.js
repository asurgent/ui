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

const useTableHook = (payloadOverrides, filterPayloadOverrides) => {
  // Holds state changes that are set simontainusly wihout a render inbetween
  // A rerender will empty these, but without a rerender setState for rowRequestState &
  // filterRequestState would overwrite previous value if no render is executed inbetween
  const initializationRequestState = {};
  const initializationHistoryState = {};
  const initializationThirdPartyTrigger = {};

  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterLoading, setFilterLoading] = useState(true);

  const [updateFilterItems, setFilterCallback] = useState(null);
  const [updateTableItems, setRowCallback] = useState({});

  const [historyState, setHistoryState] = useState({});
  const [rowRequestState, setRowRequestState] = useState({});
  const [filterRequestState, setFilterRequestState] = useState([]);

  // Independent state that enables a hook to message another hook to change its state
  const [thirdPartyTrigger, setThirdPartyTrigger] = useState({});

  const [router, setRouter] = useState({});
  const [tableData, setTableData] = useState(tableDefaults);
  const [filterData, setFilterData] = useState([]);
  const [requestFailed, setRequestFailed] = useState('');

  const getQueryParamKey = (queryPrefix) => `${queryPrefix ? `${queryPrefix}_q` : 'q'}`;

  // Is triggered whenever the state is changed by a state-changing hook as pagination, filter etc.
  useEffect(() => {
    setIsLoading(true);
    if (isReady && rowRequestState
      && Object.keys(updateTableItems).length > 0
      && Object.keys(rowRequestState).length > 0
      && Object.keys(thirdPartyTrigger).length === 0) {
      const { callback, onSuccess, onFail } = updateTableItems;
      const payload = {
        ...defaultPayload,
        ...payloadOverrides,
        ...rowRequestState,
        facets: [],
      };
      callback(payload, onSuccess, onFail);
    }
  }, [isReady, rowRequestState, thirdPartyTrigger]);

  // Is triggered when filter is opened for the first time
  useEffect(() => {
    if (isReady
      && updateFilterItems
      && filterRequestState
      && filterData.length === 0
      && filterRequestState.length > 0
      && Object.keys(updateFilterItems).length > 0) {
      setFilterLoading(true);
      const { callback, onSuccess, onFail } = updateFilterItems;
      const payload = {
        ...defaultPayload,
        ...filterPayloadOverrides,
        page_size: 1,
        facets: [...filterRequestState].map(({ facetKey }) => `${facetKey}, count:0`),
      };

      callback(payload, onSuccess, onFail);
    }
  }, [isReady, filterRequestState]);

  // Is triggered when historyState is updated
  useEffect(() => {
    if (isReady && Object.keys(router).length && Object.keys(historyState).length > 0) {
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
  /*
    Third party-hooks will have their effects run first.
    So after everyone has executed their desired actions we empyt the state
    So old instructuons wont execute again.
  */
  useEffect(() => {
    if (isReady && Object.keys(thirdPartyTrigger).length > 0) {
      setThirdPartyTrigger({});
    }
  }, [thirdPartyTrigger]);

  /*
    Workaround in order not to acceidentally overwrite a state-change from a
    previous update during the same render-cycle.

    rowRequestState & historyState holds the state render after a render-cycles.
    So, if two updates are triggered during the same render cycle we will write to,
    initializationRequestState & initializationHistoryState.
    They will later assign their values to rowRequestState & historyState
  */
  const updateAction = (request, history, trigger) => {
    if (request) {
      const updateRequest = Object.assign(initializationRequestState, rowRequestState, request);
      setRowRequestState(updateRequest);
    }
    if (history) {
      const updateHistory = Object.assign(initializationHistoryState, historyState, history);
      setHistoryState(updateHistory);
    }
    if (trigger) {
      const updateTrigger = Object.assign(initializationThirdPartyTrigger, thirdPartyTrigger, trigger);
      setThirdPartyTrigger(updateTrigger);
    }
  };

  return {
    isReady,
    isLoading,
    isFilterLoading,
    tableData,
    filterData,
    updateTableItems,
    updateFilterItems,
    thirdPartyTrigger,
    hasTriggers: () => Object.keys(thirdPartyTrigger).length > 0,
    getRequestedPageCount: () => tableData.total_pages,
    getRequestedPageNumber: () => tableData.page,
    getTablePage: () => tableData.page,
    getTableRowData: () => tableData.result,
    getScopedFilters: () => tableData.facets,
    getAllFilters: () => filterData,
    getSearchedQuery: () => historyState.search,
    loadFilterItems: (sortKeys) => {
      // Used by filterGroupHook. This will load filer-data
      setFilterRequestState([...sortKeys]);
    },
    requestFailedMessage: () => requestFailed,
    parentReady: () => { setIsReady(true); },
    enableHistoryState: ({ history, location, queryPrefix }) => {
      // Pass and store references to react-router objects.
      // If theses values are set, we will enable history-state support.
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

        // If sqp.parse doesnt match on anything it will simply return a string.
        // In order to keep the same interface-logic we will return that in an object
        if (typeof searchQueryObj === 'string') {
          return { text: searchQueryObj };
        }

        return searchQueryObj;
      }
      return {};
    },
    registerRowFetchCallback: (callback) => {
      // Callback success function that changes internal states
      const onSuccess = (response) => {
        setIsLoading(false);
        setTableData(response);
        setRequestFailed('');
      };
      // Callback fail function that changes internal states
      const onFail = (error) => {
        setIsLoading(false);
        setTableData(tableDefaults);
        setRequestFailed(error);
      };

      setRowCallback({ callback, onSuccess, onFail });
    },
    registerFilterFetchCallback: (callback) => {
      // Callback success function that changes internal states
      const onSuccess = (response) => {
        setFilterLoading(false);
        setFilterData(response);
        setRequestFailed('');
      };
      // Callback fail function that changes internal states
      const onFail = (error) => {
        setFilterLoading(false);
        setFilterData([]);
        setRequestFailed(error);
      };

      setFilterCallback({ callback, onSuccess, onFail });
    },
    update: updateAction,
  };
};

export default useTableHook;
