import React from 'react';
import PropTypes from 'prop-types';
import TableFilter from './components/TableFilter';
import useFilterHook from './useFilterHook';

const propTypes = {
  tableHook: PropTypes.instanceOf(Object).isRequired,
  filterKeys: PropTypes.instanceOf(Array).isRequired,
  parseFilter: PropTypes.func,
};

const defaultProps = {
  parseFilter: null,
};

const TableFilterProxy = ({
  tableHook,
  filterKeys,
  parseFilter,
  ...props
}) => {
  const filterHook = useFilterHook(filterKeys, tableHook, parseFilter);

  if (tableHook) {
    return (
      <TableFilter filterHook={filterHook} tableHook={tableHook} {...props} />
    );
  }

  return null;
};


TableFilterProxy.propTypes = propTypes;
TableFilterProxy.defaultProps = defaultProps;
TableFilterProxy.displayName = '@asurgent.ui.Table.TableFilterProxyProxy';

export default TableFilterProxy;
