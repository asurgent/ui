import React from 'react';
import TablePagination from './TablePagination';

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

export default TablePaginationProxy;
