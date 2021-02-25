import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import * as Spinner from '../../Spinner';
import TablePagination from '../TablePagination';
import Controlls from '../TableControlls';
import BaseTable from '../BaseTable';
import translation from '../BaseTable/BaseTable.translation';
import { Wrapper, TableLoader } from './MainTable.styled';
import * as Shield from '../../Shield';

const { t } = translation;

const getEmptystate = (hook, props) => {
  if (hook.requestFailedMessage()) {
    return hook.requestFailedMessage();
  }
  const { emptystate } = props;
  const base = emptystate;
  const query = hook.getSearchedQuery();

  // emptystate.base is what's set via <Table.Main emptystate="something"
  // which shows up when a filter-query doesnt "hit" anything.
  if (query) {
    return emptystate ? `${base}: ${query}` : t('emptystate');
  }
  return null;
};

const propTypes = {
  theme: PropTypes.instanceOf(Object).isRequired,
  tableHook: PropTypes.instanceOf(Object).isRequired,
  withSearch: PropTypes.bool,
  withPagination: PropTypes.bool,
  searchLabel: PropTypes.string,
  emptystate: PropTypes.string,
  onPagination: PropTypes.func,
  activePage: PropTypes.number,
  pages: PropTypes.number,
  rowData: PropTypes.instanceOf(Array),
  withFilter: PropTypes.instanceOf(Array),
  withSort: PropTypes.instanceOf(Array),
  withControlls: PropTypes.bool,
  parseSearchStringOutput: PropTypes.func,
  parseFilterRequestStringOutput: PropTypes.func,
  parseFilterItemRequestOutput: PropTypes.func,
  parseFilterKeyRequestOutput: PropTypes.func,
  parseFilterLabelOutput: PropTypes.func,
  displayCount: PropTypes.bool,
  canExportResults: PropTypes.bool,
  exportFileName: PropTypes.string,
  onAddRemove: PropTypes.func,
  initiallySelected: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  autoFocus: PropTypes.bool,
};

const defaultProps = {
  withControlls: true,
  withSearch: false,
  withPagination: false,
  withFilter: [],
  withSort: [],
  searchLabel: '',
  emptystate: '',
  onPagination: () => { },
  activePage: 1,
  pages: 0,
  rowData: [],
  parseSearchStringOutput: null,
  parseFilterRequestStringOutput: null,
  parseFilterItemRequestOutput: null,
  parseFilterKeyRequestOutput: null,
  parseFilterLabelOutput: null,
  displayCount: true,
  canExportResults: true,
  exportFileName: '',
  onAddRemove: null,
  initiallySelected: null,
  autoFocus: true,
};

const Table = (props) => {
  const {
    theme,
    onPagination,
    activePage,
    pages,
    rowData,
    emptystate,
    searchLabel,
    withFilter,
    withPagination,
    withSort,
    withControlls,
    parseSearchStringOutput,
    parseFilterRequestStringOutput,
    parseFilterItemRequestOutput,
    parseFilterKeyRequestOutput,
    parseFilterLabelOutput,
    displayCount,
    exportFileName,
    onAddRemove,
    initiallySelected,
    canExportResults,
    autoFocus,
    ...rest
  } = props;

  const { tableHook } = props;
  return (
    <Wrapper>
      { tableHook.isExporting() && (
        <Shield.Dark>
          <TableLoader>
            <Spinner.Ring size={50} color={theme.blue400} />
          </TableLoader>
        </Shield.Dark>
      )}
      { withControlls && (
        <Controlls
          tableHook={tableHook}
          withSort={withSort}
          withFilter={withFilter}
          searchLabel={searchLabel}
          parseSearchStringOutput={parseSearchStringOutput}
          parseFilterRequestStringOutput={parseFilterRequestStringOutput}
          parseFilterItemRequestOutput={parseFilterItemRequestOutput}
          parseFilterKeyRequestOutput={parseFilterKeyRequestOutput}
          parseFilterLabelOutput={parseFilterLabelOutput}
          autoFocus={autoFocus}
        />
      )}
      <BaseTable
        canExportResults={canExportResults}
        exportResultsAction={() => tableHook.exportSearchResult()}
        exportFileName={exportFileName}
        displayCount={displayCount}
        onAddRemove={onAddRemove}
        initiallySelected={initiallySelected}
        itemCount={tableHook.getItemCount()}
        emptystate={getEmptystate(tableHook, props)}
        isLoading={tableHook.isLoading}
        rowData={tableHook.getTableRowData()}
        withPagination={false}
        {...rest}
      />
      {withPagination && (
        <TablePagination tableHook={tableHook} />
      )}
    </Wrapper>
  );
};

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;
Table.displayName = '@asurgent.ui.Table.Main';

export default withTheme(Table);
