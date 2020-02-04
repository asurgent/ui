import React from 'react';
import PropTypes from 'prop-types';
import TablePagination from './TablePagination';

const propTypes = {
  provider: PropTypes.instanceOf(Object),
};

const defaultProps = {
  provider: null,
};

const TablePaginationProxy = (props) => {
  const { provider } = props;

  if (!provider) {
    return <TablePagination {...props} />;
  }

  if (provider.isMounted) {
    const isLoading = false;
    const activePage = provider.getActivePage();
    const onPagination = (requestedPage) => provider.onPaginate(requestedPage);
    const pages = provider.getPageCount();

    return (
      <TablePagination
        isLoading={isLoading}
        activePage={activePage}
        onPagination={onPagination}
        pages={pages}
        {...props}
      />
    );
  }

  return null;
};

TablePaginationProxy.propTypes = propTypes;
TablePaginationProxy.defaultProps = defaultProps;
TablePaginationProxy.displayName = '@asurgent.ui.Table.Proxy.Pagination';

export default TablePaginationProxy;
