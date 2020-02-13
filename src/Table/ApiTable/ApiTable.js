import React from 'react';
import PropTypes from 'prop-types';
import TableSearchBar from '../TableSearchBar';
import TableSort from '../TableSort';
import TableFilter from '../TableFilter';
import TablePagination from '../TablePagination';
import Table from '../Table';

const getEmptystate = (hook, props) => {
  if (hook.requestFailedMessage()) {
    return hook.requestFailedMessage();
  }

  // const base = props.emptystate;
  // const query = provider.getQuery();
  // if (query) {
  //   return `${base} for : ${query}`;
  // }

  return '${base} for : ${query}';
};


const propTypes = {
  tableHook: PropTypes.instanceOf(Object).isRequired,
  withSearch: PropTypes.bool,
  withPagination: PropTypes.bool,
  searchLabel: PropTypes.string,
  emptystate: PropTypes.string,
  onPagination: PropTypes.func,
  activePage: PropTypes.number,
  pages: PropTypes.number,
  rowData: PropTypes.instanceOf(Array),
  withFilter: PropTypes.instanceOf(Array),
  sortKeys: PropTypes.instanceOf(Array),
};

const defaultProps = {
  withSearch: true,
  withPagination: true,
  searchLabel: 'Search',
  emptystate: 'No items found',
  onPagination: () => {},
  activePage: 1,
  pages: 0,
  rowData: [],
  withFilter: [],
  sortKeys: [],
};

const ApiTable = (props) => {
  const {
    onPagination,
    activePage,
    pages,
    rowData,
    emptystate,
    searchLabel,
    withFilter,
    withPagination,
    sortKeys,
    ...rest
  } = props;

  const { tableHook, withSearch } = props;

  return (
    <>
      {/* { withSearch && ( */}
      <TableSearchBar
        tableHook={tableHook}
        searchLabel={searchLabel}
      />
      {/* )} */}
      <TableSort
        tableHook={tableHook}
        sortKeys={sortKeys}
      />
      {/* { withFilter && Array.isArray(withFilter) && withFilter.length > 0 && ( */}
      <TableFilter
        tableHook={tableHook}
        filterConfiguratuion={withFilter}
      />
      {/* )} */}
      <Table
        emptystate={getEmptystate(tableHook, props)}
        isLoading={tableHook.isLoading}
        rowData={tableHook.getTableRowData()}
        withPagination={false}
        {...rest}
      />
      {/* { withPagination && ( */}
      <TablePagination tableHook={tableHook} />
      {/* )} */}
    </>
  );
};

ApiTable.propTypes = propTypes;
ApiTable.defaultProps = defaultProps;
ApiTable.displayName = '@asurgent.ui.Table.Api';

export default ApiTable;
