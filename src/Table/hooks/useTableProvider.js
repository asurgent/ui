import { useEffect, useState } from 'react';

const tableDefaults = { result: [], page: 1, total_pages: 0 };

const generateApiBody = ({ search, page, pageSize }, payloadOverride) => ({
  search_string: search,
  filter: '',
  facets: [],
  order_by: [],
  search_fields: [],
  page_size: pageSize,
  page,
  ...payloadOverride,
});

const useTableProvider = (updateAction = (() => {}), payloadOverride = {}) => {
  const [tableData, setTableData] = useState(tableDefaults);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(tableData.page);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted) {
      const payload = generateApiBody({ page, search, pageSize });
      setIsLoading(true);
      updateAction(payload);
    }
  }, [isMounted, page]);

  useEffect(() => {
    if (isMounted) {
      const payload = generateApiBody({ page: 1, search, pageSize }, payloadOverride);
      setPage(1);
      setIsLoading(true);
      updateAction(payload);
    }
  }, [search]);

  return {
    onPaginate: (pageNumber) => { setPage(pageNumber); },
    onSearch: (query) => {
      setSearch(query);
    },
    setPageSize: (size) => setPageSize(size),
    getActivePage: () => tableData.page,
    getPageCount: () => tableData.total_pages,
    getRowData: () => tableData.result,
    setResponse: (response) => {
      setIsLoading(false);
      setTableData(response);
    },
    getQuery: () => search,
    parentReady: () => { setIsMounted(true); },
    isLoading,
    tableData,
  };
};

export default useTableProvider;
