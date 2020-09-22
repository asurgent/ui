import { useEffect, useState } from 'react';
import queryString from 'query-string';
import sqp from 'search-query-parser';

const tableDefaults = {
  page: 1,
  result: [],
  facets: [],
  total_pages: 10,
  total_count: 0,
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

const useTableHook = (payloadOverrides) => {
  // Holds state changes that are set simontainusly wihout a render inbetween
  // A rerender will empty these, but without a rerender setState for rowRequestState &
  // filterRequestKeyState would overwrite previous value if no render is executed inbetween
  const initializationRequestState = {};
  const initializationHistoryState = {};
  const initializationThirdPartyTrigger = {};

  const [isReady, setIsReady] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterLoading, setFilterLoading] = useState(true);

  const [updateFilterItems, setFilterCallback] = useState(null);
  const [updateTableItems, setRowCallback] = useState({});

  const [historyState, setHistoryState] = useState({});
  const [rowRequestState, setRowRequestState] = useState({});
  const [filterRequestKeyState, setFilterRequestKeyState] = useState({});

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
        ...rowRequestState,
        facets: [],
      };

      if (payloadOverrides && typeof payloadOverrides === 'function') {
        Object.assign(payload, payloadOverrides(payload));
      }

      callback(payload, onSuccess, onFail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, rowRequestState, thirdPartyTrigger]);

  // Is triggered when filter is opened for the first time
  useEffect(() => {
    if (isReady
      && updateFilterItems
      && filterRequestKeyState.filterKey
      && Object.keys(updateFilterItems).length > 0) {
      setFilterLoading(true);
      const { callback, onSuccess, onFail } = updateFilterItems;
      const { filterKey, requestString } = filterRequestKeyState;
      const payload = {
        ...defaultPayload,
        filter: requestString,
        search_string: rowRequestState.search_string,
        page_size: 0,
        facets: [`${filterKey}, count:0`],
      };

      if (payloadOverrides && typeof payloadOverrides === 'function') {
        Object.assign(payload, payloadOverrides(payload));
      }

      callback(payload, onSuccess, onFail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, filterRequestKeyState]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const updateTrigger = Object.assign(
        initializationThirdPartyTrigger,
        thirdPartyTrigger,
        trigger,
      );
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
    isExporting: () => isExporting,
    getRequestedPageCount: () => tableData.total_pages,
    getRequestedPageNumber: () => tableData.page,
    getTablePage: () => tableData.page,
    getTableRowData: () => tableData.result,
    getScopedFilters: () => tableData.facets,
    getAllFilters: () => filterData,
    getItemCount: () => tableData.total_count,
    getSearchedQuery: () => decodeURI(historyState.search),
    loadFilterForKey: (filterKey, requestString) => {
      // Used by filterGroupHook. This will load filer-data
      setFilterRequestKeyState({ filterKey, requestString });
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
    exportSearchResult: async () => {
      const totalPages = tableData.total_pages;
      const result = [];
      setIsExporting(true);

      if (totalPages > 1) {
        const itemCount = tableData.total_count;
        const maxItemsPerRequest = 999;
        const resuestPageSize = itemCount > maxItemsPerRequest ? maxItemsPerRequest : itemCount;
        const pages = Math.ceil(itemCount / maxItemsPerRequest);

        const { callback } = updateTableItems;
        const { requestString } = filterRequestKeyState;
        const payload = {
          ...defaultPayload,
          filter: requestString,
          search_string: rowRequestState.search_string,
          page_size: 0,
        };

        if (payloadOverrides && typeof payloadOverrides === 'function') {
          Object.assign(payload, payloadOverrides(payload));
        }

        Object.assign(payload, { page_size: resuestPageSize, facets: [] });

        const req = (page) => new Promise((resolve) => {
          const requestPayload = Object.assign(payload, { page });
          const success = (e) => { resolve(e.result); };
          const reject = () => { };
          callback(requestPayload, success, reject);
        });

        for (let i = 1; i <= pages; i += 1) {
          /* eslint-disable-next-line no-await-in-loop */
          const res = await req(i);
          result.push(res);
        }
      } else {
        result.push(tableData.result);
      }
      setIsExporting(false);

      return result.flat();
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
