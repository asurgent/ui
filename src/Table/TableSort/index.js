import React from 'react';
import PropTypes from 'prop-types';
import TableSort from './TableSort';
import useSortHook from './useSortHook';

const propTypes = {
  tableHook: PropTypes.instanceOf(Object).isRequired,
  sortKeys: PropTypes.instanceOf(Array).isRequired,
};

const defaultProps = {};


const TableSortProxy = (props) => {
  const { tableHook, sortKeys } = props;
  const sortHook = useSortHook(sortKeys, tableHook);

  if (tableHook && tableHook.isReady) {
    return <TableSort {...props} sortHook={sortHook} />;
  }

  return null;
};

TableSortProxy.propTypes = propTypes;
TableSortProxy.defaultProps = defaultProps;
TableSortProxy.displayName = '@asurgent.ui.Table.TableSortProxy';

export default TableSortProxy;
