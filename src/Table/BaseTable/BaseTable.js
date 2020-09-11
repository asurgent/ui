import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import * as Icons from '@material-ui/icons';
import * as Spinner from '../../Spinner';
import TableHeader from '../TableHeader';
import * as Button from '../../Button';
import * as C from './BaseTable.styled';
import generateRows from './helpers';
import translation from './BaseTable.translation';

export const propTypes = {
  canExportResults: PropTypes.bool,
  exportFileName: PropTypes.string,
  exportResultsAction: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
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
  cardComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  cardView: PropTypes.bool,
  equalSizeColumns: PropTypes.bool,
  isLoading: PropTypes.bool,
  emptystate: PropTypes.string,
  itemCount: PropTypes.number,
  displayCount: PropTypes.bool,
};

export const defaultProps = {
  cardView: false,
  canExportResults: false,
  exportResultsAction: false,
  withHeader: false,
  headerData: [],
  cardRowConfiguration: false,
  tableRowConfiguration: false,
  cellComponent: false,
  rowComponent: false,
  cardComponent: false,
  equalSizeColumns: false,
  isLoading: false,
  emptystate: '',
  itemCount: 0,
  exportFileName: '',
  displayCount: false,
};

const bodyComponents = {
  cell: C.Cell,
  row: C.Row,
  card: C.Card,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowData, cardView]);

  const {
    zebra,
    striped,
    withHeader,
    equalSizeColumns,
    isLoading,
    emptystate,
    displayCount,
    canExportResults,
    exportResultsAction,
    exportFileName,
  } = props;

  const noContent = rows.length === 0 && isLoading === false;
  const { t } = translation;
  return (
    <C.Wrapper>
      <C.Base>
        { displayCount && (
          <C.Count>
            {`${itemCount} ${t('results', 'asurgentui')}`}
            { canExportResults && exportResultsAction && (
              <Button.Icon
                disabled={itemCount === 0}
                saveToFilename={exportFileName}
                tooltip={t('export', 'asurgentui')}
                saveToJson={exportResultsAction}
                icon={<Icons.SaveAlt fontSize="medium" />}
              />
            )}
          </C.Count>
        )}
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
          {noContent && <C.Loading>{emptystate || t('emptystate', 'asurgentui')}</C.Loading>}
          {!isLoading && rows}
          {isLoading && (
            <C.Loading>
              <Spinner.Ring size={32} color={theme.blue400} />
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
