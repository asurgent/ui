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
  const [search, setSearch] = useState('');
  const [requestFailed, setRequestFailed] = useState('');
  const [page, setPage] = useState(tableData.page);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted) {
      setIsLoading(true);
      const urlQuery = `page=${page}&search=${search}`;
      updateAction(payload, urlQuery);
    }
  }, [isMounted, payload]);

  useEffect(() => {
    const update = Object.assign(payloadCache, { page });
    setPayload(update);
  }, [page]);

  useEffect(() => {
    const update = Object.assign(payloadCache, { page: 1, search_string: search });
    setPayload(update);
  }, [search]);

  return {
    /* Table-component interface */
    onPaginate: (pageNumber) => { setPage(pageNumber); },
    onSearch: (query) => { setSearch(query); },
    getActivePage: () => tableData.page,
    getPageCount: () => tableData.total_pages,
    getRowData: () => tableData.result,
    getQuery: () => search,
    requestFailedMessage: () => requestFailed,
    isLoading,
    tableData,
    /* User interface */
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
        setPage(pageNumber);
      }
    },
    setSearchQuery: (query) => {
      if (typeof query === 'string') {
        setSearch(query);
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
