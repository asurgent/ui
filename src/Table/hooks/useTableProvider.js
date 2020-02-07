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
  size: 10,
  searchQuery: '',
  sortKeys: [],
  filters: [],
  filter: '',
  facets: [],
  currentSort: { value: null, direction: null },
};


const useTableProvider = (updateAction = (() => {})) => {
  const preRenderState = { ...cacheDefaults };
  const [currentState, setCurrentState] = useState({ ...preRenderState, initated: false });
  const [filterState, setFilterState] = useState([]);

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

  const updateState = (update) => {
    setCurrentState({ ...currentState, ...update, initated: true });
  };

  const updateInitalState = (update) => {
    setCurrentState(Object.assign(preRenderState, update));
  };

  const hookInterfaceApi = {
    /* Table-component interface */
    onPaginate: (pageNumber) => {
      updateState({ page: pageNumber });
    },
    // ToTo @ Mike. Fix!
    // Both search an sort are triggered by table-controller
    // cause they share the same form and will trigger two set actions
    onSearch: (searchQuery) => {
      updateState({ searchQuery, page: 1 });
    },
    onSort: (currentSort) => {
      updateState({ currentSort });
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
      if (hookInterfaceApi.hasPreRenderSortyKeys() && sort !== undefined && sort) {
        const [key, direction] = sort.split('-');
        hookInterfaceApi.setInitailSortOrder(key, direction);
      }
    },
    getPageCount: () => tableData.total_pages,
    getRowData: () => tableData.result,
    getActivePage: () => currentState.page,
    getQuery: () => currentState.searchQuery,
    hasSortyKeys: () => currentState.sortKeys.length > 0,
    hasPreRenderSortyKeys: () => preRenderState.sortKeys.length > 0,
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
        updateInitalState({ filter });
      }
    },
    setFacets: (facets) => {
      if (Array.isArray(facets)) {
        updateInitalState({ facets });
      }
    },
    setPageSize: (size) => {
      if (size && size > 10) {
        updateInitalState({ size });
      }
    },
    setOrderBy: (orderBy) => {
      if (Array.isArray(orderBy)) {
        updateInitalState({ orderBy });
      }
    },
    setSearchFields: (searchFields) => {
      if (Array.isArray(searchFields)) {
        updateInitalState({ searchFields });
      }
    },
    setPageNumber: (pageNumber) => {
      if (typeof pageNumber === 'number' && pageNumber > 0) {
        updateInitalState({ page: pageNumber });
      }
    },
    setSearchQuery: (searchQuery) => {
      if (typeof searchQuery === 'string') {
        updateInitalState({ searchQuery });
      }
    },
    setFilterOption: (filter) => {
      if (Array.isArray(filter) && filter.length > 0) {
        setFilterState(filter);
      }
    },
    getFilter: () => filterState,
    hasFilter: () => filterState.length > 0,
    setSortKeys: (sortKeys) => {
      if (Array.isArray(sortKeys) && sortKeys.length > 0) {
        const { value, direction } = getDefaultSortItem(sortKeys);
        updateInitalState({
          sortKeys,
          currentSort: { value, direction },
        });
      }
    },
    setInitailSortOrder: (key, direction) => {
      if (key && direction) {
        const newSortKeys = changeDefaultSort(key, direction, preRenderState.sortKeys);
        updateInitalState({
          currentSort: { value: key, direction },
          sortKeys: newSortKeys,
        });
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
