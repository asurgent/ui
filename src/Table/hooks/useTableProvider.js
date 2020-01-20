import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { sortDirection } from '../helpers';

// make sure our format is passed around in the app
export const parseSortDirectionToInt = (direction) => {
  if (direction) {
    if (direction === 'asc') {
      return sortDirection.asc;
    }

    return sortDirection.desc;
  }

  return sortDirection.desc;
};

const tableDefaults = { result: [], page: 1, total_pages: 0 };
const defaultPayload = {
  search_string: '',
  filter: '',
  facets: [],
  order_by: [],
  search_fields: [],
  page_size: 10,
  page: 1,
};

const buildSearchQuery = ({
  prefix, location, page, query, sort,
}) => {
  const search = queryString.parse(location.search);
  const queryKey = `${prefix && `${prefix}_`}search`;
  const pageKey = `${prefix && `${prefix}_`}page`;
  const sortKey = `${prefix && `${prefix}_`}sort`;
  const directionKey = `${prefix && `${prefix}_`}sort_dir`;

  Object.assign(search, {
    [pageKey]: page,
  });

  const { currentSort } = sort;
  if (currentSort.value !== undefined) {
    Object.assign(search, {
      [sortKey]: currentSort.value,
    });

    if (currentSort.direction !== undefined) {
      Object.assign(search, {
        [directionKey]: currentSort.direction,
      });
    }
  }

  if (query) {
    Object.assign(search, {
      [queryKey]: query,
    });

    return `?${queryString.stringify(search)}`;
  }

  const { [queryKey]: _, ...rest } = search;
  return `?${queryString.stringify(rest)}`;
};

const useTableProvider = (updateAction = (() => {})) => {
  const payloadCache = { ...defaultPayload };
  const sortCache = { currentSort: {}, sortKeys: [] };

  const [router, setRouter] = useState({});
  const [payload, setPayload] = useState({ ...payloadCache });
  const [sort, setSort] = useState({ ...sortCache });
  const [tableData, setTableData] = useState(tableDefaults);
  const [isLoading, setIsLoading] = useState(true);
  const [requestFailed, setRequestFailed] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [triggerUpdate, setTriggerUpdate] = useState(0);


  useEffect(() => {
    if (isMounted) {
      setIsLoading(true);
      const update = { ...payload };
      if (sort.currentSort.value && sort.currentSort.direction) {
        Object.assign(update, {
          order_by: [`${sort.currentSort.value} ${sort.currentSort.direction}`],
        });
      }
      updateAction(update);

      if (Object.keys(router).length) {
        const { page, search_string: query } = payload;
        const { location, history, prefix } = router;

        const newLocation = {
          ...location,
          search: buildSearchQuery({
            prefix, location, page, query, sort,
          }),
        };
        history.replace(newLocation);
      }
    }
  }, [isMounted, triggerUpdate]);

  const trigger = () => { setTriggerUpdate(triggerUpdate + 1); };

  const hookInterfaceApi = {
    /* Table-component interface */
    onPaginate: (pageNumber) => {
      setPayload({ ...payload, page: pageNumber });
      trigger();
    },
    onSearch: (query) => {
      setPayload({ ...payload, search_string: query, page: 1 });
      trigger();
    },
    onSort: (orderBy) => {
      setSort({ ...sort, currentSort: orderBy });
      trigger();
    },
    enableHistoryState: ({ history, location, prefix }) => {
      setRouter({ history, location, prefix });
      const {
        [`${prefix && `${prefix}_`}search`]: search,
        [`${prefix && `${prefix}_`}page`]: page,
        [`${prefix && `${prefix}_`}sort`]: sortKey,
        [`${prefix && `${prefix}_`}sort_dir`]: direction,
      } = queryString.parse(location.search);

      hookInterfaceApi.setSearchQuery(search);
      hookInterfaceApi.setPageNumber(parseInt(page, 10));

      if (sortKey !== undefined && Array.isArray(sortCache.sortKeys)) {
        const newSortKeys = sortCache
          .sortKeys
          .reduce((acc, { direction: removeA, default: removeB, ...rest }) => {
            if (sortKey === rest.value) {
              const newSort = { ...rest, default: true, direction: direction || 'desc' };
              Object.assign(payloadCache, {
                order_by: [`${newSort.value} ${newSort.direction}`],
              });

              return [newSort, ...acc];
            }

            return [{ ...rest }, ...acc];
          }, []);

        hookInterfaceApi.setSortKeys(newSortKeys);
      }
    },
    getActivePage: () => payload.page,
    getPageCount: () => tableData.total_pages,
    getRowData: () => tableData.result,
    getQuery: () => payload.search_string,
    hasSortyKeys: () => sort.sortKeys.length > 0,
    getSortKey: () => sort.currentSort.value,
    getSortDirection: () => sort.currentSort.direction,
    getSortDirectionInt: () => parseSortDirectionToInt(sort.currentSort.direction),
    getSortKeys: () => sort.sortKeys,
    requestFailedMessage: () => requestFailed,
    parentReady: () => { setIsMounted(true); },
    isLoading,
    tableData,
    isMounted,
    payload,
    /*
      User interface.
      Calld upon pre render, that why we use payloadCahce.
      Because the payload-state wont be update until a re-render
      and after render payload cache will be reset to default
    */
    setFilter: (filter) => {
      if (typeof filter === 'string') {
        const update = Object.assign(payloadCache, { filter });
        setPayload(update);
      }
    },
    setFacets: (facets) => {
      if (Array.isArray(facets)) {
        const update = Object.assign(payloadCache, { facets });
        setPayload(update);
      }
    },
    setOrderBy: (orderBy) => {
      if (Array.isArray(orderBy)) {
        const update = Object.assign(payloadCache, { order_by: orderBy });
        setPayload(update);
      }
    },
    setSearchFields: (searchFields) => {
      if (Array.isArray(searchFields)) {
        const update = Object.assign(payloadCache, { search_fields: searchFields });
        setPayload(update);
      }
    },
    setPageNumber: (pageNumber) => {
      if (typeof pageNumber === 'number' && pageNumber > 0) {
        const update = Object.assign(payloadCache, { page: pageNumber });
        setPayload(update);
      }
    },
    setSearchQuery: (query) => {
      if (typeof query === 'string') {
        const update = Object.assign(payloadCache, { search_string: query });
        setPayload(update);
      }
    },
    setSortKeys: (sortKeys) => {
      if (Array.isArray(sortKeys) && sortKeys.length > 0) {
        const hasDefaultSort = sortKeys.find((item) => item.default);
        const update = Object.assign(sortCache, { sortKeys });
        if (hasDefaultSort === undefined) {
          const { value } = sortKeys[0];

          Object.assign(sortKeys[0], {
            default: true,
            direction: sortDirection.desc,
          });
          Object.assign(sortCache, { currentSort: { value, direction: sortDirection.desc } });
        } else {
          const { value, direction } = hasDefaultSort;
          const sanitizeDirection = (direction === sortDirection.desc || direction === sortDirection.asc) ? direction : sortDirection.desc;
          Object.assign(sortCache, { currentSort: { value, direction: sanitizeDirection } });
        }

        setSort(update);
      }
    },
    setInitailSortOrder: (orderByObject) => {
      if (typeof orderByObject === 'object') {
        const update = Object.assign(sortCache, { currentSort: orderByObject });
        setSort(update);
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
    update: () => { trigger(); },
  };

  return hookInterfaceApi;
};

export default useTableProvider;
