import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { RingSpinner } from 'react-spinners-kit';
import TableHeader from '../TableHeader';
import * as C from './BaseTable.styled';
import generateRows from './helpers';


export const propTypes = {
  withHeader: PropTypes.bool,
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
  itemCount: PropTypes.number,
  displayCount: PropTypes.bool.isRequired,
};

export const defaultProps = {
  cardView: false,
  withHeader: false,
  headerData: [],
  cardRowConfiguration: false,
  tableRowConfiguration: false,
  cellComponent: false,
  rowComponent: false,
  equalSizeColumns: false,
  isLoading: false,
  emptystate: 'No items found',
  itemCount: 0,
};

const bodyComponents = {
  cell: C.Cell,
  row: C.Row,
  content: C.TableCellContent,
};

const BaseTable = withTheme((props) => {
  const {
    rowData,
    headerData,
    cardView,
    itemCount,
    // clickRowConfigutation
    // tableRowConfiguration,
    // cardRowConfiguration,
    // cellComponent,
    // rowComponent,
    // sortDirection,
    theme,
  } = props;

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const defaultRows = generateRows(props, bodyComponents);
    setRows(defaultRows);
  }, [rowData, cardView]);

  const {
    zebra,
    striped,
    withHeader,
    equalSizeColumns,
    isLoading,
    emptystate,
    displayCount,
  } = props;

  const noContent = rows.length === 0 && isLoading === false;

  return (
    <C.Wrapper>
      <C.Base>
        {displayCount && <C.Count>{`${itemCount} results`}</C.Count>}
        <C.Content
          zebra={zebra}
          striped={striped}
          headerList={headerData}
          equalSize={equalSizeColumns}
        >
          {
            withHeader && (
              <TableHeader
                headerData={props.headerData}
                equalSizeColumns={props.equalSizeColumns}
              />
            )
          }
          {/* Render rows start */}
          {noContent && <C.Loading>{emptystate}</C.Loading>}
          {!isLoading && rows}
          {isLoading && (
            <C.Loading>
              <RingSpinner color={theme.blue400} size={32} />
            </C.Loading>
          )}
          {/* Render rows end */}
        </C.Content>
      </C.Base>
    </C.Wrapper>
  );
});

BaseTable.propTypes = propTypes;
BaseTable.defaultProps = defaultProps;

export default BaseTable;
