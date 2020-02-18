import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from '@material-ui/icons';
import * as Button from '../../Button';
import * as C from './TablePagination.styled';

const propTypes = {
  tableHook: PropTypes.instanceOf(Object).isRequired,
  paginationHook: PropTypes.instanceOf(Object).isRequired,
};

const defaultProps = {};

const TablePagination = ({
  tableHook,
  paginationHook,
}) => (
  paginationHook.hasPagination() && (
    <C.Pagination isLoading={tableHook.isLoading}>
      <Button.Icon
        onClick={paginationHook.previousPage}
        icon={<Icons.NavigateBefore fontSize="large" />}
      />

      {
          paginationHook.getPaginationList()
            .map(({ value, clickable }, index) => (
              <C.Page
                key={`${value}-${index}`}
                isClickable={clickable}
                activePage={paginationHook.getActivePage() === value}
                onClick={() => clickable && paginationHook.setPage(value)}
              >
                {value}
              </C.Page>
            ))
        }

      <Button.Icon
        onClick={paginationHook.nextPage}
        icon={<Icons.NavigateNext fontSize="large" />}
      />

    </C.Pagination>
  )
);

TablePagination.propTypes = propTypes;
TablePagination.defaultProps = defaultProps;
TablePagination.displayName = '@asurgent.ui.Table.Pagination';

export default TablePagination;
