import React from 'react';
import PropTypes from 'prop-types';
import TableSort from './TableSort';

const propTypes = {
  tableHook: PropTypes.instanceOf(Object).isRequired,
};

const defaultProps = {};


const TableSortProxy = (props) => {
  const { tableHook } = props;

  if (tableHook && tableHook.isReady) {
    return <TableSort {...props} />;
  }

  return null;
};

TableSortProxy.propTypes = propTypes;
TableSortProxy.defaultProps = defaultProps;
TableSortProxy.displayName = '@asurgent.ui.Table.TableSortProxy';

export default TableSortProxy;
