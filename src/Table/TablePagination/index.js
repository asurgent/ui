import React from 'react';
import PropTypes from 'prop-types';
import TablePagination from './TablePagination';

const propTypes = {
  tableHook: PropTypes.instanceOf(Object),
};

const defaultProps = {
  tableHook: null,
};

const TablePaginationProxy = (props) => {
  const { tableHook } = props;

  if (!tableHook) {
    return <TablePagination {...props} />;
  }

  if (tableHook.isMounted) {
    return (
      <TablePagination tableHook={tableHook} {...props} />
    );
  }

  return null;
};

TablePaginationProxy.propTypes = propTypes;
TablePaginationProxy.defaultProps = defaultProps;
TablePaginationProxy.displayName = '@asurgent.ui.Table.Proxy.Pagination';

export default TablePaginationProxy;
