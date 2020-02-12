import { useEffect, useState } from 'react';
import queryString from 'query-string';
import sqp from 'search-query-parser';
import {
  changeDefaultSort,
  generatePayload,
  parseQueryArrayToString,
  getDefaultSortItem,
  buildFilterObjectFromState,
  buildFilterQuery,
  buildFilterStateString,
} from './helpers';

const tableDefaults = { result: [], page: 1, total_pages: 0 };
const cacheDefaults = {
  page: 1,
  size: 10,
  searchQuery: '',
  sortKeys: [],
  filterQuery: '',
  filterState: '',
  facets: [],
  currentSort: { value: null, direction: null },
};

const urlKey = { PAGE: 'page', SORT: 'sort', FILTER: 'filter' };
const searchKeywords = { keywords: Object.values(urlKey) };

const useTableProvider = (updateAction = (() => {}), filterAction = (() => {})) => {
  const preRenderState = { ...cacheDefaults };
  const [currentState, setCurrentState] = useState({ ...preRenderState, initated: false });

  const [router, setRouter] = useState({});
  const [tableData, setTableData] = useState(tableDefaults);
  const [isLoading, setIsLoading] = useState(true);
  const [requestFailed, setRequestFailed] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  const paramKey = (prefix) => `${prefix && `${prefix}_`}q`;

  useEffect(() => {
    if (isMounted) {
      setIsLoading(true);
      updateAction(generatePayload(currentState));

      if (Object.keys(router).length) {
        const { location, history, prefix } = router;

        const buildSearchQuery = () => {
          const search = queryString.parse(location.search);
          const {
            filterState,
            filterQuery,
            currentSort,
            searchQuery,
            page: currentPage,
          } = currentState;

          const { PAGE, FILTER, SORT } = urlKey;
          const tableState = [
            { value: `${searchQuery}`, valid: !!searchQuery },
            { value: `${PAGE}:${currentPage}`, valid: true },
            {
              value: `${SORT}:${currentSort.value}-${currentSort.direction}`,
              valid: currentSort.value && currentSort.direction,
            },
            {
              value: `${FILTER}:"${filterState}"`,
              valid: filterQuery && filterQuery.length > 0,
            },
          ];

          const param = paramKey(prefix);
          Object.assign(search, {
            [param]: parseQueryArrayToString(tableState),
          });

          return `?${queryString.stringify(search)}`;
        };

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
    onFilter: (filterQuery, filterState) => {
      updateState({ filterQuery, filterState, page: 1 });
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
      const { [paramKey(prefix)]: tableState } = queryString.parse(location.search);

      const searchQueryObj = sqp.parse(tableState, searchKeywords);

      const {
        filter: encodedFilterString,
        text: query,
        page,
        sort,
      } = searchQueryObj;

      if (query !== undefined && query) {
        hookInterfaceApi.setSearchQuery(query);
      }
      if (encodedFilterString !== undefined && encodedFilterString) {
        try {
          // TODO @ Cleanup categories by input filter configuration. Like removing customer_id etc
          const filterState = buildFilterObjectFromState(encodedFilterString);
          const stateString = buildFilterStateString(filterState);
          const filter = buildFilterQuery(filterState);
          hookInterfaceApi.setFilter(filter, stateString);
        } catch (e) {
          hookInterfaceApi.setFilter('', '');
        }
      }
      if (page !== undefined) {
        hookInterfaceApi.setPageNumber(parseInt(page, 10));
      }
      if (hookInterfaceApi.hasPreRenderSortyKeys() && sort !== undefined && sort) {
        const [key, direction] = sort.split('-');
        hookInterfaceApi.setInitailSortOrder(key, direction);
      }
    },
    getHistoryState: (callback) => {
      const { location, prefix } = router;
      const { [paramKey(prefix)]: tableState } = queryString.parse(location.search);

      const searchQueryObj = sqp.parse(tableState, searchKeywords);

      callback(searchQueryObj);
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
    fetchFilter: (keys, callback) => {
      const payload = {
        ...cacheDefaults,
        size: 1,
        facets: [...keys],
      };
      filterAction(payload, callback);
    },
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
    setFilter: (filterQuery, filterState) => {
      if (typeof filterQuery === 'string') {
        updateInitalState({ filterQuery });
      }
      if (typeof filterState === 'string') {
        updateInitalState({ filterState });
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
