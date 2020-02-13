import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Icons from '@material-ui/icons';
import * as Button from '../../Button';
import * as C from './TablePagination.styled';
import calcualtePaginationList from './helpers';
import usePaginationHook from './usePaginationHook';

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
  tableHook,
}) => {
  const paginationHook = usePaginationHook(tableHook);
  const [paginationList, setPaginationList] = useState([]);

  useEffect(() => {
    const newList = calcualtePaginationList(activePage, pages, PAGINATION_DELTA);
    setPaginationList(newList);
  }, [activePage, pages]);

  if (paginationList && paginationList.length === 0) {
    return null;
  }

  return (
    <C.Pagination isLoading={isLoading}>
      <Button.Icon
        onClick={() => onPagination(activePage - 1)}
        icon={<Icons.NavigateBefore fontSize="large" />}
      />

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

      <Button.Icon
        onClick={() => onPagination(activePage + 1)}
        icon={<Icons.NavigateNext fontSize="large" />}
      />
    </C.Pagination>
  );
};

TablePagination.propTypes = propTypes;
TablePagination.defaultProps = defaultProps;
TablePagination.displayName = '@asurgent.ui.Table.Pagination';

export default TablePagination;
