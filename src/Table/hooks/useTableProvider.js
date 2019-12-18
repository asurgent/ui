import { useEffect, useState } from 'react';

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

const useTableProvider = (updateAction = (() => {})) => {
  const payloadCache = { ...defaultPayload };
  const [payload, setPayload] = useState({ ...payloadCache });
  const [tableData, setTableData] = useState(tableDefaults);
  const [isLoading, setIsLoading] = useState(true);
  const [requestFailed, setRequestFailed] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted) {
      setIsLoading(true);
      const { page, search_string } = payload;
      const urlQuery = `page=${page}${search_string && `&search=${search_string}`}`;
      updateAction(payload, urlQuery);
    }
  }, [isMounted, payload]);


  return {
    /* Table-component interface */
    onPaginate: (pageNumber) => {
      setPayload({ ...payload, page: pageNumber });
    },
    onSearch: (query) => {
      setPayload({ ...payload, search_string: query, page: 1 });
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
  };
};

export default useTableProvider;
