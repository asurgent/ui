import React from 'react';
import PropTypes from 'prop-types';
import TableSearchBar from './TableSearchBar';
import useSearchbarHook from './useSearchbarHook';

const propTypes = {
  tableHook: PropTypes.instanceOf(Object).isRequired,
};

const defaultProps = {};


const TableSearchBarProxy = ({ tableHook, ...props }) => {
  const searchHook = useSearchbarHook(tableHook);

  if (tableHook) {
    return <TableSearchBar {...props} searchHook={searchHook} tableHook={tableHook} />;
  }

  return null;
};

TableSearchBarProxy.propTypes = propTypes;
TableSearchBarProxy.defaultProps = defaultProps;
TableSearchBarProxy.displayName = '@asurgent.ui.Table.TableSearchBarProxy';

export default TableSearchBarProxy;
