import React from 'react';
import PropTypes from 'prop-types';
import * as Form from '../Form';
import Table, {
  defaultProps as baseDefaultProps,
  propTypes as basePropsTypes,
} from './Table';

const getEmptystate = (provider, props) => {
  const base = props.emptystate;
  const query = provider.getQuery();
  if (query) {
    return `${base} for : ${query}`;
  }
  return base;
};

const searchForm = ({ searchLabel }) => ({
  search: {
    type: 'text', label: searchLabel, value: '',
  },
});

const propTypes = {
//   ...basePropsTypes,
  provider: PropTypes.instanceOf(Object),
  withSearch: PropTypes.bool,
  searchLabel: PropTypes.string,
  emptystate: PropTypes.string,
};

const defaultProps = {
//   ...baseDefaultProps,
  provider: {},
  withSearch: true,
  searchLabel: 'Search',
  emptystate: 'No items found',
};

const ApiSearchTable = (props) => {
  const {
    onPagination,
    activePage,
    pages,
    rowData,
    emptystate,
    ...rest
  } = props;

  const formData = Form.useFormBuilder(searchForm(props));
  const { provider, withSearch } = props;

  return (
    <>
      { withSearch && (
        <Form.Primary
          form={formData}
          onNewValue={(values) => { provider.onSearch(values.search); }}
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
        // sortDirection={sortDirection.asc}
        // activeSort=""
        {...rest}
      />
    </>
  );
};


ApiSearchTable.propTypes = propTypes;
ApiSearchTable.defaultProps = defaultProps;

export default ApiSearchTable;
