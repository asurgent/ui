import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as C from './Table.styled';
import { generateRows } from './helpers';

import { sortDirection as directions } from '.';

const propTypes = {
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
  tableRowConfiguration: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  cardRowConfiguration: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  cardView: PropTypes.bool,
  equalSizeColumns: PropTypes.bool,
};

const defaultProps = {
  pages: 0,
  activePage: 0,
  cardView: false,
  withHeader: true,
  withPagination: true,
  headerData: [],
  cardRowConfiguration: false,
  tableRowConfiguration: false,
  equalSizeColumns: false,
};

const bodyComponents = {
  cell: C.Cell,
  content: C.TableCellContent,
};

const Table = (props) => {
  const {
    rowData,
    headerData,
    cardView,
    tableRowConfiguration,
    cardRowConfiguration,
    sortDirection,
    activeSort,
  } = props;

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const defaultRows = generateRows(props, bodyComponents);
    setRows(defaultRows);
  }, [cardView]);

  const {
    pages,
    zebra,
    striped,
    activePage,
    withHeader,
    withPagination,
    equalSizeColumns,
  } = props;

  const onPagination = (requestedPage) => {
    const page = Math.max(1, Math.min(pages, requestedPage));
    props.onPagination(page);
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

  const getPages = Array.from({ length: pages }).map((_, i) => i + 1);
  return (
    <C.Wrapper>
      <C.Base>
        <C.Content headerList={headerData} equalSize={equalSizeColumns} zebra={zebra} striped={striped}>
          { withHeader
            && headerData.map(({ value, sortKey }) => (
              <C.Header key={value} onClick={() => onSort(sortKey)}>
                <C.HeaderContent>{value}</C.HeaderContent>
                { sortKey === activeSort && (
                  <C.HeaderSort active direction={sortDirection} />
                )}
                { sortKey && sortKey !== activeSort && (
                  <C.HeaderSort />
                )}
              </C.Header>
            )) }
          {/* Render rows start */}
          { rows }
          {/* Render rows end */}
        </C.Content>
      </C.Base>
      { withPagination && (
        <C.Pagination>
          <C.Arrow left onClick={() => onPagination(activePage - 1)} />
          { getPages.map((page) => (
            <C.Page activePage={activePage === page} key={page} onClick={() => onPagination(page)}>
              {page}
            </C.Page>
          ))}
          <C.Arrow right onClick={() => onPagination(activePage + 1)} />
        </C.Pagination>
      )}
    </C.Wrapper>
  );
};

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default Table;
