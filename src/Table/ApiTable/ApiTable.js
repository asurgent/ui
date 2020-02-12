import React from 'react';
import PropTypes from 'prop-types';
import TableSearchBar from '../TableSearchBar';
import TableFilter from '../TableFilter';
import Table from '../Table';
import getEmptystate from './helpers';

const propTypes = {
  tableHook: PropTypes.instanceOf(Object).isRequired,
  withSearch: PropTypes.bool,
  searchLabel: PropTypes.string,
  emptystate: PropTypes.string,
  onPagination: PropTypes.func,
  activePage: PropTypes.number,
  pages: PropTypes.number,
  rowData: PropTypes.instanceOf(Array),
  withFilter: PropTypes.instanceOf(Array),
};

const defaultProps = {
  withSearch: true,
  searchLabel: 'Search',
  emptystate: 'No items found',
  onPagination: () => {},
  activePage: 1,
  pages: 0,
  rowData: [],
  withFilter: [],
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
    ...rest
  } = props;

  const { tableHook, withSearch } = props;

  return (
    <>
      { withSearch && (
        <TableSearchBar
          tableHook={tableHook}
          searchLabel={searchLabel}
        />
      )}
      { withFilter && Array.isArray(withFilter) && withFilter.length > 0 && (
        <TableFilter
          tableHook={tableHook}
          filterConfiguratuion={withFilter}
        />
      )}
      <Table
        emptystate={getEmptystate(tableHook, props)}
        isLoading={tableHook.isLoading}
        onPagination={(requestedPage) => {
          tableHook.onPaginate(requestedPage);
        }}
        activePage={tableHook.getActivePage()}
        pages={tableHook.getPageCount()}
        rowData={tableHook.getRowData()}
        {...rest}
      />
    </>
  );
};

ApiTable.propTypes = propTypes;
ApiTable.defaultProps = defaultProps;
ApiTable.displayName = '@asurgent.ui.Table.Api';

export default ApiTable;
