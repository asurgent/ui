import React from 'react';
import PropTypes from 'prop-types';
import TableFilter from './components/TableFilter';
import useFilterHook from './useFilterHook';

const propTypes = {
  tableHook: PropTypes.instanceOf(Object).isRequired,
  filterKeys: PropTypes.instanceOf(Array).isRequired,
  parseFilterRequestStringOutput: PropTypes.func,
  parseFilterItemRequestOutput: PropTypes.func,
  parseFilterKeyRequestOutput: PropTypes.func,
  parseFilterLabelOutput: PropTypes.func,
};

const defaultProps = {
  parseFilterRequestStringOutput: null,
  parseFilterItemRequestOutput: null,
  parseFilterKeyRequestOutput: null,
  parseFilterLabelOutput: null,
};

const TableFilterProxy = ({
  tableHook,
  filterKeys,
  parseFilterRequestStringOutput,
  parseFilterItemRequestOutput,
  parseFilterKeyRequestOutput,
  parseFilterLabelOutput,
  ...props
}) => {
  const parsers = {
    filterItem: parseFilterItemRequestOutput,
    filterKey: parseFilterKeyRequestOutput,
    label: parseFilterLabelOutput,
    requestString: parseFilterRequestStringOutput,
  };

  const filterHook = useFilterHook(filterKeys, tableHook, parsers);

  if (tableHook && tableHook.isReady) {
    return (
      <TableFilter filterHook={filterHook} tableHook={tableHook} {...props} />
    );
  }

  return null;
};

TableFilterProxy.propTypes = propTypes;
TableFilterProxy.defaultProps = defaultProps;

export default TableFilterProxy;
