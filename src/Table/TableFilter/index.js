import React, { useEffect } from 'react';
import TableFilter from './TableFilter';
import useFilter from '../hooks/useFilterProvider';
import { buildFilterObjectFromState } from '../hooks/helpers';

const TableFilterProxy = ({ tableHook, filterConfiguratuion }) => {
  const filterHook = useFilter(filterConfiguratuion, tableHook);

  useEffect(() => {
    tableHook.getHistoryState(({ filter }) => {
      const state = buildFilterObjectFromState(filter);
      filterHook.setSelectedItems(state);
    });
  }, []);

  if (tableHook && tableHook.isMounted) {
    return (
      <TableFilter filterHook={filterHook} tableHook={tableHook} />
    );
  }

  return null;
};

export default TableFilterProxy;
