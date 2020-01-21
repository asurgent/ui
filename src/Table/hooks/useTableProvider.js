import { useEffect, useState } from 'react';
import queryString from 'query-string';
import sqp from 'search-query-parser';
import {
  changeDefaultSort,
  generatePayload,
  buildSearchQuery,
  getDefaultSortItem,
} from './helpers';

const tableDefaults = { result: [], page: 1, total_pages: 0 };
const cacheDefaults = {
  page: 1,
  searchQuery: '',
  sortKeys: [],
  filters: [],
  filter: '',
  facets: [],
  currentSort: { value: null, direction: null },
};

const useTableProvider = (updateAction = (() => {})) => {
  const preRenderState = { ...cacheDefaults };
  const [currentState, setCurrentState] = useState({ ...preRenderState });

  const [router, setRouter] = useState({});
  const [tableData, setTableData] = useState(tableDefaults);
  const [isLoading, setIsLoading] = useState(true);
  const [requestFailed, setRequestFailed] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted) {
      setIsLoading(true);
      updateAction(generatePayload(currentState));

      if (Object.keys(router).length) {
        const { location, history, prefix } = router;
        const newLocation = {
          ...location,
          search: buildSearchQuery(prefix, location, currentState),
        };
        history.replace(newLocation);
      }
    }
  }, [isMounted, currentState]);


  const hookInterfaceApi = {
    /* Table-component interface */
    onPaginate: (pageNumber) => {
      setCurrentState({ ...currentState, page: pageNumber });
    },
    // ToTo @ Mike. Fix!
    // Both search an sort are triggered by table-controller
    // cause they share the same form and will trigger two set actions
    onSearch: (searchQuery) => {
      setCurrentState({ ...currentState, searchQuery, page: 1 });
    },
    onSort: (currentSort) => {
      setCurrentState({ ...currentState, currentSort });
    },
    enableHistoryState: ({ history, location, prefix }) => {
      setRouter({ history, location, prefix });
      const {
        [`${prefix && `${prefix}_`}q`]: tableState,
      } = queryString.parse(location.search);

      const options = { keywords: ['page', 'sort', 'filter'] };
      const searchQueryObj = sqp.parse(tableState, options);

      const { text: query, page, sort } = searchQueryObj;

      if (query !== undefined && query) {
        hookInterfaceApi.setSearchQuery(query);
      }
      if (page !== undefined) {
        hookInterfaceApi.setPageNumber(parseInt(page, 10));
      }
      if (sort !== undefined && sort) {
        const [key, direction] = sort.split('-');
        hookInterfaceApi.setInitailSortOrder(key, direction);
      }
    },
    getPageCount: () => tableData.total_pages,
    getRowData: () => tableData.result,
    getActivePage: () => currentState.page,
    getQuery: () => currentState.searchQuery,
    hasSortyKeys: () => currentState.sortKeys.length > 0,
    getSortKey: () => currentState.currentSort.value,
    getSortDirection: () => currentState.currentSort.direction,
    getSortKeys: () => currentState.sortKeys,
    requestFailedMessage: () => requestFailed,
    parentReady: () => { setIsMounted(true); },
    isLoading,
    tableData,
    isMounted,
    currentState,
    /*
      User interface.
      Calld upon pre render, that why we use currentStateCahce.
      Because the currentState-state wont be update until a re-render
      and after render currentState cache will be reset to default
    */
    setFilter: (filter) => {
      if (typeof filter === 'string') {
        const update = Object.assign(preRenderState, { filter });
        setCurrentState(update);
      }
    },
    setFacets: (facets) => {
      if (Array.isArray(facets)) {
        const update = Object.assign(preRenderState, { facets });
        setCurrentState(update);
      }
    },
    setOrderBy: (orderBy) => {
      if (Array.isArray(orderBy)) {
        const update = Object.assign(preRenderState, { orderBy });
        setCurrentState(update);
      }
    },
    setSearchFields: (searchFields) => {
      if (Array.isArray(searchFields)) {
        const update = Object.assign(preRenderState, { searchFields });
        setCurrentState(update);
      }
    },
    setPageNumber: (pageNumber) => {
      if (typeof pageNumber === 'number' && pageNumber > 0) {
        const update = Object.assign(preRenderState, { page: pageNumber });
        setCurrentState(update);
      }
    },
    setSearchQuery: (searchQuery) => {
      if (typeof searchQuery === 'string') {
        const update = Object.assign(preRenderState, { searchQuery });
        setCurrentState(update);
      }
    },
    setSortKeys: (sortKeys) => {
      if (Array.isArray(sortKeys) && sortKeys.length > 0) {
        const { value, direction } = getDefaultSortItem(sortKeys);
        const update = Object.assign(preRenderState, {
          sortKeys,
          currentSort: { value, direction },
        });
        setCurrentState(update);
      }
    },
    setInitailSortOrder: (key, direction) => {
      if (key && direction) {
        const newSortKeys = changeDefaultSort(key, direction, preRenderState.sortKeys);
        const update = Object.assign(preRenderState, {
          currentSort: { value: key, direction },
          sortKeys: newSortKeys,
        });
        setCurrentState(update);
      }
    },
    /*
      Table callback functions
    */
    setSuccessResponse: (response) => {
      setIsLoading(false);
      setTableData(response);
      setRequestFailed('');
    },
    setFailedResponse: (error) => {
      setIsLoading(false);
      setTableData(tableDefaults);
      setRequestFailed(error);
    },
    update: () => {},
  };

  return hookInterfaceApi;
};

export default useTableProvider;
