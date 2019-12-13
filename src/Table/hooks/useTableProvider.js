import { useEffect, useState } from 'react';

const tableDefaults = { result: [], page: 1, total_pages: 0 };

const useTableProvider = (updateAction = (() => {})) => {
  const [tableData, setTableData] = useState(tableDefaults);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(tableData.page);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted) {
      updateAction(page, search);
    }
  }, [isMounted, page]);

  useEffect(() => {
    if (isMounted) {
      setPage(1);
      updateAction(1, search);
    }
  }, [search]);

  return {
    onPaginate: (pageNumber) => { setPage(pageNumber); },
    onSearch: (query) => {
      setSearch(query);
    },
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
