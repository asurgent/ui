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

  const base = props.emptystate;
  const query = hook.getSearchedQuery();
  if (query) {
    return `${base} for : ${query}`;
  }
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
  withControlls: PropTypes.bool,
  parseFilterRequestStringOutput: PropTypes.func,
  parseFilterItemRequestOutput: PropTypes.func,
  parseFilterKeyRequestOutput: PropTypes.func,
  parseFilterLabelOutput: PropTypes.func,
  displayCount: PropTypes.bool,
};

const defaultProps = {
  withControlls: true,
  withSearch: false,
  withPagination: false,
  withFilter: [],
  withSort: [],
  searchLabel: 'Search',
  emptystate: 'No items found',
  onPagination: () => { },
  activePage: 1,
  pages: 0,
  rowData: [],
  parseFilterRequestStringOutput: null,
  parseFilterItemRequestOutput: null,
  parseFilterKeyRequestOutput: null,
  parseFilterLabelOutput: null,
  displayCount: false,
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
    withControlls,
    parseFilterRequestStringOutput,
    parseFilterItemRequestOutput,
    parseFilterKeyRequestOutput,
    parseFilterLabelOutput,
    ...rest
  } = props;

  const { tableHook } = props;

  return (
    <Wrapper>
      {withControlls && (
        <Controlls
          tableHook={tableHook}
          withSort={withSort}
          withFilter={withFilter}
          searchLabel={searchLabel}
          parseFilterRequestStringOutput={parseFilterRequestStringOutput}
          parseFilterItemRequestOutput={parseFilterItemRequestOutput}
          parseFilterKeyRequestOutput={parseFilterKeyRequestOutput}
          parseFilterLabelOutput={parseFilterLabelOutput}
        />
      )}
      <BaseTable
        displayCount={props.displayCount}
        itemCount={tableHook.getItemCount()}
        emptystate={getEmptystate(tableHook, props)}
        isLoading={tableHook.isLoading}
        rowData={tableHook.getTableRowData()}
        withPagination={false}
        {...rest}
      />
      {withPagination && (
        <TablePagination tableHook={tableHook} />
      )}
    </Wrapper>
  );
};

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;
Table.displayName = '@asurgent.ui.Table.Main';

export default Table;
