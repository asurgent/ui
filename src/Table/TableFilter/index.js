import React from 'react';
import TableFilter from './TableFilter';
import useFilter from '../hooks/useFilterProvider';

const TableFilterProxy = ({ tableHook, filterConfiguratuion }) => {
  const filterHook = useFilter(filterConfiguratuion, tableHook);

  if (tableHook && tableHook.isMounted) {
    return (
      <TableFilter filterHook={filterHook} tableHook={tableHook} />
    );
  }

  return null;
};

export default TableFilterProxy;
