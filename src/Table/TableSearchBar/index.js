import React from 'react';
import PropTypes from 'prop-types';
import TableSearchBar from './TableSearchBar';
import useSearchbarHook from './useSearchbarHook';

const propTypes = {
  tableHook: PropTypes.instanceOf(Object).isRequired,
  parseSearchStringOutput: PropTypes.func,
};

const defaultProps = {
  parseSearchStringOutput: null,
};


const TableSearchBarProxy = ({ tableHook, parseSearchStringOutput, ...props }) => {
  const parsers = { parseSearchStringOutput };
  const searchHook = useSearchbarHook(tableHook, parsers);

  if (tableHook && tableHook.isReady) {
    return <TableSearchBar {...props} searchHook={searchHook} tableHook={tableHook} />;
  }

  return null;
};

TableSearchBarProxy.propTypes = propTypes;
TableSearchBarProxy.defaultProps = defaultProps;
TableSearchBarProxy.displayName = '@asurgent.ui.Table.TableSearchBarProxy';

export default TableSearchBarProxy;
