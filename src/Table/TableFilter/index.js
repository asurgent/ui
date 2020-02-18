import React from 'react';
import PropTypes from 'prop-types';
import TableFilter from './components/TableFilter';
import useFilterHook from './useFilterHook';

const propTypes = {
  tableHook: PropTypes.instanceOf(Object).isRequired,
  filterKeys: PropTypes.instanceOf(Array).isRequired,
  parseFilterRequestOutput: PropTypes.func,
  parseFilterLabelOutput: PropTypes.func,
};

const defaultProps = {
  parseFilterRequestOutput: null,
  parseFilterLabelOutput: null,
};

const TableFilterProxy = ({
  tableHook,
  filterKeys,
  parseFilterRequestOutput,
  parseFilterLabelOutput,
  ...props
}) => {
  const parseLabel = parseFilterLabelOutput;
  const parseRequest = parseFilterRequestOutput;
  const filterHook = useFilterHook(filterKeys, tableHook, parseRequest, parseLabel);

  if (tableHook && tableHook.isReady) {
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
