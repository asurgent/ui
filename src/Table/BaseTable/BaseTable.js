import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import MdiIcon from '@mdi/react';
import { mdiDownload } from '@mdi/js';
import * as Spinner from '../../Spinner';
import TableHeader from '../TableHeader';
import * as Button from '../../Button';
import * as C from './BaseTable.styled';
import generateRows from './helpers';
import translation from './BaseTable.translation';
import * as T from '../../Typography';

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
  onAddRemove: PropTypes.func,
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
  onAddRemove: null,
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

  const [selected, setSelected] = useState([]);

  const {
    zebra,
    striped,
    withHeader,
    equalSizeColumns,
    isLoading,
    emptystate,
    displayCount,
    onAddRemove,
    canExportResults,
    exportResultsAction,
    exportFileName,
  } = props;

  useEffect(() => {
    const handleSelect = (item) => {
      const isSelected = selected.some((i) => i.id === item.id);
      if (isSelected) {
        setSelected(selected.filter((i) => i.id !== item.id));
      } else {
        setSelected([...selected, item]);
      }
    };
    const defaultRows = generateRows(props, bodyComponents, handleSelect, onAddRemove);
    setRows(defaultRows);
  }, [rowData, cardView, props, selected, onAddRemove]);

  const noContent = rows.length === 0 && isLoading === false;
  const { t } = translation;

  return (
    <C.Wrapper>
      <C.Base>
        <C.ActionMenu>
          { displayCount && (
          <C.Count>
            { canExportResults && exportResultsAction && (
              <Button.Plain
                disabled={itemCount === 0}
                saveToFilename={exportFileName}
                tooltip={t('export', 'asurgentui')}
                saveToFile={exportResultsAction}
              >
                {`${itemCount} ${t('results', 'asurgentui')}`}
                <MdiIcon size={1} path={mdiDownload} />
              </Button.Plain>
            )}
          </C.Count>
          )}
          {onAddRemove && (
            <>
              <C.SelectedNumber bold>
                {`${selected.length} ${t('added', 'asurgentui')}`}
              </C.SelectedNumber>
              <C.AddBtn
                tooltip={`${itemCount - selected.length} ${t('more', 'asurgentui')}`}
                onClick={async () => {
                  const filteredResults = await exportResultsAction();
                  setSelected(filteredResults);
                  onAddRemove(filteredResults);
                }}
              >
                {t('addAll', 'asurgentui')}
              </C.AddBtn>
              <C.RemoveBtn
                onClick={async () => {
                  const filteredResults = await exportResultsAction();
                  const selectedIds = filteredResults.map((s) => s.id);
                  const filteredSelected = selected.filter((s) => !selectedIds.includes(s.id));

                  setSelected(filteredSelected);
                  onAddRemove(filteredSelected);
                }}
              >
                {t('removeAll', 'asurgentui')}
              </C.RemoveBtn>
            </>
          )}
        </C.ActionMenu>

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
              <Spinner.Ring size={32} color={theme.blue900} />
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
