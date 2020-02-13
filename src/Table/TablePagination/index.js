import React from 'react';
import PropTypes from 'prop-types';
import TablePagination from './TablePagination';
import usePaginationHook from './usePaginationHook';

const propTypes = {
  tableHook: PropTypes.instanceOf(Object),
};

const defaultProps = {
  tableHook: null,
};

const TablePaginationProxy = (props) => {
  const { tableHook } = props;
  const paginationHook = usePaginationHook(tableHook, props);

  if (!tableHook) {
    return <TablePagination {...props} paginationHook={paginationHook} />;
  }

  return (
    <TablePagination tableHook={tableHook} paginationHook={paginationHook} {...props} />
  );
};

TablePaginationProxy.propTypes = propTypes;
TablePaginationProxy.defaultProps = defaultProps;
TablePaginationProxy.displayName = '@asurgent.ui.Table.Proxy.Pagination';

export default TablePaginationProxy;
