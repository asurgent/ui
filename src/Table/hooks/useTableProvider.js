import { useEffect, useState } from 'react';
import queryString from 'query-string';

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

  Object.assign(search, {
    [pageKey]: page,
    [sortKey]: sort,
  });

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
  const [router, setRouter] = useState({});
  const [payload, setPayload] = useState({ ...payloadCache });
  const [tableData, setTableData] = useState(tableDefaults);
  const [isLoading, setIsLoading] = useState(true);
  const [requestFailed, setRequestFailed] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [triggerUpdate, setTriggerUpdate] = useState(0);

  useEffect(() => {
    if (isMounted) {
      setIsLoading(true);
      updateAction(payload);

      if (Object.keys(router).length) {
        const { page, search_string: query, order_by: sort } = payload;
        const { location, history, prefix } = router;

        const newLocation = {
          ...location,
          search: buildSearchQuery({
            prefix, location, page, query, sort,
          }),
        };
        console.log(newLocation);

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
      setPayload({ ...payload, order_by: orderBy });
      trigger();
    },
    enableHistoryState: ({ history, location, prefix }) => {
      setRouter({ history, location, prefix });

      const {
        [`${prefix && `${prefix}_`}search`]: search,
        [`${prefix && `${prefix}_`}page`]: page,
        [`${prefix && `${prefix}_`}sort`]: sort,
      } = queryString.parse(location.search);

      hookInterfaceApi.setSearchQuery(search);
      hookInterfaceApi.setPageNumber(parseInt(page, 10));
      hookInterfaceApi.setOrderBy([sort]);
    },
    getActivePage: () => payload.page,
    getPageCount: () => tableData.total_pages,
    getRowData: () => tableData.result,
    getQuery: () => payload.search_string,
    requestFailedMessage: () => requestFailed,
    isLoading,
    tableData,
    isMounted,
    /* User interface */
    payload,
    parentReady: () => { setIsMounted(true); },
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
