import { useEffect, useState } from 'react';
import queryString from 'query-string';
import sqp from 'search-query-parser';

const urlKey = { PAGE: 'page', SORT: 'sort', FILTER: 'filter' };
const tableDefaults = { result: [], page: 1, total_pages: 0 };
const searchKeywords = { keywords: Object.values(urlKey) };

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
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const [updateFilterItems, setFilterCallback] = useState(null);
  const [updateTableItems, setRowCallback] = useState(null);
  const [requestState, setRequestState] = useState({});
  const [historyState, setHistoryState] = useState({});

  const [router, setRouter] = useState({});
  const [tableData, setTableData] = useState(tableDefaults);
  const [filterData, setFilterData] = useState([]);
  const [requestFailed, setRequestFailed] = useState('');

  useEffect(() => {
    setIsLoading(true);
    if (updateTableItems && Object.keys(updateTableItems).length > 0) {
      const { callback, onSuccess, onFail } = updateTableItems;
      callback(defaultPayload, onSuccess, onFail);
    }
  }, [isMounted, requestState]);

  return {
    isLoading,
    isMounted,
    tableData,
    filterData,
    updateFilterItems,
    updateTableItems,
    enableHistoryState: ({ history, location, prefix }) => {
      setRouter({ history, location, prefix });
    },
    getHistoryState: () => {
      const { location } = router;
      const { q: tableState } = queryString.parse(location.search);
      const searchQueryObj = sqp.parse(tableState, searchKeywords);

      return searchQueryObj;
    },
    requestFailedMessage: () => requestFailed,
    parentReady: () => { setIsMounted(true); },
    getTableRowData: () => tableData.result,
    getFilterData: () => tableData.facets,
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
        setRequestState({ ...requestState, ...request });
      }
      if (history) {
        setHistoryState({ ...historyState, ...history });
      }
    },
  };
};

export default useTableProvider;
