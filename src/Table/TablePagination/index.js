import React from 'react';
import PropTypes from 'prop-types';
import TablePagination from './TablePagination';
import usePaginationHook from './usePaginationHook';

const propTypes = {
  tableHook: PropTypes.instanceOf(Object).isRequired,
};

const defaultProps = {};

const TablePaginationProxy = (props) => {
  const { tableHook } = props;
  const paginationHook = usePaginationHook(tableHook, props);

  if (tableHook && tableHook.isReady) {
    return <TablePagination tableHook={tableHook} paginationHook={paginationHook} {...props} />;
  }

  return null;
};

TablePaginationProxy.propTypes = propTypes;
TablePaginationProxy.defaultProps = defaultProps;

export default TablePaginationProxy;
