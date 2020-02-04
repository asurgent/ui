import React from 'react';
import PropTypes from 'prop-types';
import * as C from './TablePagination.styled';
import pagination from './helpers';

const PAGINATION_DELTA = 5;

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  activePage: PropTypes.number.isRequired,
  onPagination: PropTypes.func.isRequired,
  pages: PropTypes.number.isRequired,
};

const defaultProps = {};

const TablePagination = ({
  isLoading,
  activePage,
  onPagination,
  pages,
}) => {
  const paginationList = pagination(activePage, pages, PAGINATION_DELTA);

  if (paginationList && paginationList.length <= 1) {
    return null;
  }

  return (
    <C.Pagination isLoading={isLoading}>
      <C.Arrow left onClick={() => onPagination(activePage - 1)} />
      { paginationList.map(({ value, clickable }, index) => (
        <C.Page
          key={`${value}-${index}`}
          isClickable={clickable}
          activePage={activePage === value}
          onClick={() => clickable && onPagination(value)}
        >
          {value}
        </C.Page>
      ))}
      <C.Arrow right onClick={() => onPagination(activePage + 1)} />
    </C.Pagination>
  );
};

TablePagination.propTypes = propTypes;
TablePagination.defaultProps = defaultProps;
TablePagination.displayName = '@asurgent.ui.Table.Pagination';

export default TablePagination;
