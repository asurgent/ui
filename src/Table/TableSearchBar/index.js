import React from 'react';
import TableSearchBar from './TableSearchBar';

const TableSearchBarProxy = (props) => {
  const { provider } = props;

  if (provider && provider.isMounted) {
    return <TableSearchBar {...props} />;
  }

  return null;
};

export default TableSearchBarProxy;
