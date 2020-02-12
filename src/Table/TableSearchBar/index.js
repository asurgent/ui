import React from 'react';
import PropTypes from 'prop-types';
import TableSearchBar from './TableSearchBar';


const propTypes = {
  tableHook: PropTypes.instanceOf(Object).isRequired,
};

const defaultProps = {};


const TableSearchBarProxy = (props) => {
  const { tableHook } = props;

  if (tableHook && tableHook.isMounted) {
    return <TableSearchBar {...props} />;
  }

  return null;
};

TableSearchBarProxy.propTypes = propTypes;
TableSearchBarProxy.defaultProps = defaultProps;
TableSearchBarProxy.displayName = '@asurgent.ui.Table.TableSearchBarProxy';

export default TableSearchBarProxy;
