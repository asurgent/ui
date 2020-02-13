import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TableFilter from './components/TableFilter';
import useFilter from './useFilterProvider';
import { buildFilterObjectFromState } from './helpers';

const propTypes = {
  tableHook: PropTypes.instanceOf(Object).isRequired,
  filterConfiguratuion: PropTypes.instanceOf(Array).isRequired,
};

const defaultProps = {};

const TableFilterProxy = ({ tableHook, filterConfiguratuion }) => {
  const filterHook = useFilter(filterConfiguratuion, tableHook);

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
