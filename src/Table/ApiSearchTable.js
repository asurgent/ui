import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Form from '../Form';
import Table from './Table';

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

const searchForm = ({ searchLabel }, provider) => ({
  search: {
    type: 'text', label: searchLabel, value: provider.getQuery(),
  },
});

const propTypes = {
  provider: PropTypes.instanceOf(Object).isRequired,
  withSearch: PropTypes.bool,
  searchLabel: PropTypes.string,
  emptystate: PropTypes.string,
  useHistoryState: PropTypes.bool,
  historyStatePrefix: PropTypes.string,
  onPagination: PropTypes.func,
  activePage: PropTypes.number,
  pages: PropTypes.number,
  rowData: PropTypes.instanceOf(Array),
};

const defaultProps = {
  withSearch: true,
  searchLabel: 'Search',
  emptystate: 'No items found',
  useHistoryState: false,
  historyStatePrefix: '',
  onPagination: () => {},
  activePage: 1,
  pages: 0,
  rowData: [],
};

const ApiSearchTable = (props) => {
  const {
    useHistoryState,
    historyStatePrefix,
    onPagination,
    activePage,
    pages,
    rowData,
    emptystate,
    ...rest
  } = props;

  const { provider, withSearch } = props;
  const formData = Form.useFormBuilder(searchForm(props, provider));

  useEffect(() => {
    formData.updateField('search', { props: { disabled: provider.isLoading } });
  }, [provider.isLoading]);

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

const TableRenderProxy = (props) => {
  const { provider, useHistoryState, historyStatePrefix } = props;
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (useHistoryState) {
      provider.enableHistoryState({ history, location, prefix: historyStatePrefix || '' });
    }
  }, []);

  if (provider.isMounted) {
    return <ApiSearchTable {...props} />;
  }

  return null;
};

export default TableRenderProxy;
