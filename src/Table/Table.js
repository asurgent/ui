import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { RingSpinner } from 'react-spinners-kit';
import TablePagination from './TablePagination';
import * as C from './Table.styled';
import { generateRows, sortDirection as directions } from './helpers';


export const propTypes = {
  pages: PropTypes.number,
  activePage: PropTypes.number,
  withHeader: PropTypes.bool,
  withPagination: PropTypes.bool,
  rowData: PropTypes.arrayOf(
    PropTypes.instanceOf(Object),
  ).isRequired,
  headerData: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      sortKey: PropTypes.string,
    }),
  ),
  onPagination: PropTypes.func,
  onSort: PropTypes.func,
  tableRowConfiguration: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  cardRowConfiguration: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  cellComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  rowComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  cardView: PropTypes.bool,
  equalSizeColumns: PropTypes.bool,
  isLoading: PropTypes.bool,
  emptystate: PropTypes.string,
};

export const defaultProps = {
  pages: 0,
  activePage: 0,
  cardView: false,
  withHeader: true,
  withPagination: true,
  headerData: [],
  cardRowConfiguration: false,
  tableRowConfiguration: false,
  cellComponent: false,
  rowComponent: false,
  equalSizeColumns: false,
  isLoading: false,
  emptystate: 'No items found',
  onPagination: () => {},
  onSort: () => {},
};

const bodyComponents = {
  cell: C.Cell,
  row: C.Row,
  content: C.TableCellContent,
};

// const PAGINATION_DELTA = 5;

const Table = withTheme((props) => {
  const {
    rowData,
    headerData,
    cardView,
    // clickRowConfigutation
    // tableRowConfiguration,
    // cardRowConfiguration,
    // cellComponent,
    // rowComponent,
    sortDirection,
    activeSort,
    theme,
  } = props;

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const defaultRows = generateRows(props, bodyComponents);
    setRows(defaultRows);
  }, [rowData, cardView]);

  const {
    pages,
    zebra,
    striped,
    activePage,
    withHeader,
    withPagination,
    equalSizeColumns,
    isLoading,
    emptystate,
  } = props;

  const onPagination = (requestedPage) => {
    const page = Math.max(1, Math.min(pages, requestedPage));
    if (page !== activePage) {
      props.onPagination(page);
    }
  };

  const onSort = (sortKey) => {
    if (sortKey === activeSort) {
      const newSort = sortDirection === directions.asc
        ? directions.desc
        : directions.asc;

      props.onSort(sortKey, newSort);
    } else {
      props.onSort(sortKey, directions.asc);
    }
  };

  const noContent = rows.length === 0 && isLoading === false;

  return (
    <C.Wrapper>
      <C.Base>
        <C.Content
          zebra={zebra}
          striped={striped}
          headerList={headerData}
          equalSize={equalSizeColumns}
        >
          { withHeader && (
            <C.HeaderRow headerList={props.headerData} equalSize={props.equalSizeColumns} striped>
              { headerData.map(({ value, sortKey, props: headerProps }) => (
                <C.Header {...(headerProps || {})} key={value} onClick={() => sortKey && onSort(sortKey)} sortKey={sortKey}>
                  <C.HeaderContent sortKey={sortKey}>{value}</C.HeaderContent>
                  { sortKey !== undefined && (
                    <C.HeaderSort active={sortKey === activeSort} direction={sortDirection} />
                  )}
                </C.Header>
              )) }
            </C.HeaderRow>
          )}
          {/* Render rows start */}
          { noContent && <C.Loading>{emptystate}</C.Loading>}
          { !isLoading && rows }
          { isLoading && (
            <C.Loading>
              <RingSpinner color={theme.blue400} size={32} />
            </C.Loading>
          )}
          {/* Render rows end */}
        </C.Content>
      </C.Base>
      { withPagination && (
        <TablePagination
          isLoading={isLoading}
          onPagination={onPagination}
          activePage={activePage}
          pages={pages}
        />
      )}
    </C.Wrapper>
  );
});

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default Table;
