import React from 'react';
import PropTypes from 'prop-types';
import TableSearchBar from '../TableSearchBar';
import TableFilter from '../TableFilter';
import Table from '../Table';

const getEmptystate = (provider, props) => {
  if (provider.requestFailedMessage()) {
    return provider.requestFailedMessage();
  }

  const base = props.emptystate;
  const query = provider.getQuery();
  if (query) {
    return `${base} for : ${query}`;
  }
  return base;
};


const propTypes = {
  provider: PropTypes.instanceOf(Object).isRequired,
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

  const { provider, withSearch } = props;

  return (
    <>
      { withSearch && (
        <TableSearchBar
          provider={provider}
          searchLabel={searchLabel}
        />
      )}
      { withFilter && Array.isArray(withFilter) && withFilter.length > 0 && (
        <TableFilter
          tableHook={provider}
          filterConfiguratuion={withFilter}
        />
      )}
      <Table
        emptystate={getEmptystate(provider, props)}
        isLoading={provider.isLoading}
        onPagination={(requestedPage) => {
          provider.onPaginate(requestedPage);
        }}
        activePage={provider.getActivePage()}
        pages={provider.getPageCount()}
        rowData={provider.getRowData()}
        {...rest}
      />
    </>
  );
};

ApiTable.propTypes = propTypes;
ApiTable.defaultProps = defaultProps;
ApiTable.displayName = '@asurgent.ui.Table.Api';

export default ApiTable;
