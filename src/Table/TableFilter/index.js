import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TableFilter from './TableFilter';
import useFilter from './misc/useFilterProvider';
import { buildFilterObjectFromState } from './misc/helpers';

const propTypes = {
  tableHook: PropTypes.instanceOf(Object).isRequired,
  filterConfiguratuion: PropTypes.instanceOf(Array).isRequired,
};

const defaultProps = {};

const TableFilterProxy = ({ tableHook, filterConfiguratuion }) => {
  const filterHook = useFilter(filterConfiguratuion, tableHook);

  useEffect(() => {
    if (tableHook.isMounted) {
      tableHook.getHistoryState(({ filter }) => {
        const state = buildFilterObjectFromState(filter);
        filterHook.setSelectedItems(state);
      });
    }
  }, [tableHook.isMounted]);

  if (tableHook && tableHook.isMounted) {
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
