import React from 'react';
import TableFilter from './TableFilter';

const TableFilterProxy = (props) => {
  const { provider } = props;

  if (provider && provider.isMounted) {
    return <TableFilter {...props} />;
  }

  return null;
};

export default TableFilterProxy;
