import { useEffect, useState, useRef } from 'react';

const useTableProvider = () => {
  const actions = {
    update: () => {},
  };

  const tableRef = useRef(1);
  const [tableData, setTableData] = useState({ result: [], page: 1, total_pages: 10 });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  //   useEffect(() => {
  //     // props.onMount({ setTickets: setTicket });
  //   }, []);

  useEffect(() => {
    console.log(page, search, tableRef);

    // actions.update(page, search);
  }, [search, page]);

  return {
    updateAction: (update) => { Object.assign(actions, { update }); },
    onPaginate: (pageNumber) => {
      setPage(pageNumber);
    },
    onSearch: (query) => {
      setSearch(query);
    },
    getActivePage: () => tableData.page,
    getPageCount: () => tableData.total_pages,
    getRowData: () => tableData.result,
    tableData,
    tableRef,
  };
};

export default useTableProvider;
