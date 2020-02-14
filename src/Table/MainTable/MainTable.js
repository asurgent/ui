import React from 'react';
import PropTypes from 'prop-types';
import TablePagination from '../TablePagination';
import Controlls from '../TableControlls';
import BaseTable from '../BaseTable';
import { Wrapper } from './MainTable.styled';

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
  withSort: PropTypes.instanceOf(Array),
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
  withSort: [],
};

const Table = (props) => {
  const {
    onPagination,
    activePage,
    pages,
    rowData,
    emptystate,
    searchLabel,
    withFilter,
    withPagination,
    withSort,
    ...rest
  } = props;

  const { tableHook, withSearch } = props;

  return (
    <Wrapper>
      <Controlls
        tableHook={tableHook}
        withSearch={withSearch}
        withSort={withSort}
        withFilter={withFilter}
      />
      <BaseTable
        emptystate={getEmptystate(tableHook, props)}
        isLoading={tableHook.isLoading}
        rowData={tableHook.getTableRowData()}
        withPagination={false}
        {...rest}
      />
      { withPagination && (
        <TablePagination tableHook={tableHook} />
      )}
    </Wrapper>
  );
};

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;
Table.displayName = '@asurgent.ui.Table.Main';

export default Table;
