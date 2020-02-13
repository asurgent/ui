import React from 'react';
import PropTypes from 'prop-types';
import TableFilter from './components/TableFilter';
import useFilterHook from './useFilterHook';

const propTypes = {
  tableHook: PropTypes.instanceOf(Object).isRequired,
  filterConfiguratuion: PropTypes.instanceOf(Array).isRequired,
};

const defaultProps = {};

const TableFilterProxy = ({ tableHook, filterConfiguratuion }) => {
  const filterHook = useFilterHook(filterConfiguratuion, tableHook);

  if (tableHook) {
    return (
      <TableFilter filterHook={filterHook} tableHook={tableHook} />
    );
  }

  return null;
};


TableFilterProxy.propTypes = propTypes;
TableFilterProxy.defaultProps = defaultProps;
TableFilterProxy.displayName = '@asurgent.ui.Table.TableFilterProxyProxy';

export default TableFilterProxy;
