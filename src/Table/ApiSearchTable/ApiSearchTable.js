import React from 'react';
import PropTypes from 'prop-types';
import TableControlls from './components/TableControlls';
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
  sortKeys: PropTypes.instanceOf(Array),
  initialSort: PropTypes.instanceOf(Object),
};

const defaultProps = {
  withSearch: true,
  searchLabel: 'Search',
  emptystate: 'No items found',
  onPagination: () => {},
  activePage: 1,
  pages: 0,
  rowData: [],
  sortKeys: [],
  initialSort: null,
};

const ApiSearchTable = (props) => {
  const {
    onPagination,
    activePage,
    pages,
    rowData,
    emptystate,
    sortKeys,
    initialSort,
    searchLabel,
    ...rest
  } = props;

  const { provider, withSearch } = props;

  return (
    <>
      { withSearch && (
        <TableControlls
          provider={provider}
          sortKeys={sortKeys}
          initialSort={initialSort}
          searchLabel={searchLabel}
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

ApiSearchTable.propTypes = propTypes;
ApiSearchTable.defaultProps = defaultProps;

export default ApiSearchTable;
