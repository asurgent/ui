import React from 'react';
import PropTypes from 'prop-types';
import MdiIcon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
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
        icon={(
          <MdiIcon
            size={1.2}
            path={mdiChevronLeft}
          />
        )}
      />

      {
          paginationHook.getPaginationList()
            .map(({ value, clickable }, index) => (
              <C.Page
                // eslint-disable-next-line react/no-array-index-key
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
        icon={(
          <MdiIcon
            size={1.2}
            path={mdiChevronRight}
          />
        )}
      />

    </C.Pagination>
  )
);

TablePagination.propTypes = propTypes;
TablePagination.defaultProps = defaultProps;

export default TablePagination;
