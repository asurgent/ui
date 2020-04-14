import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { RingSpinner } from 'react-spinners-kit';
import { withTheme } from 'styled-components';
import TablePagination from '../TablePagination';
import Controlls from '../TableControlls';
import BaseTable from '../BaseTable';

import { Wrapper, Loader } from './MainTable.styled';
import * as Shield from '../../Shield';

const modalRoot = document.getElementById('tooltip-root');

const getEmptystate = (hook, props) => {
  if (hook.requestFailedMessage()) {
    return hook.requestFailedMessage();
  }
  const { emptystate } = props;
  const base = emptystate;
  const query = hook.getSearchedQuery();
  if (query) {
    return `${base} for : ${query}`;
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
  parseFilterRequestStringOutput: PropTypes.func,
  parseFilterItemRequestOutput: PropTypes.func,
  parseFilterKeyRequestOutput: PropTypes.func,
  parseFilterLabelOutput: PropTypes.func,
  displayCount: PropTypes.bool,
  exportFileName: PropTypes.string,
};

const defaultProps = {
  withControlls: true,
  withSearch: false,
  withPagination: false,
  withFilter: [],
  withSort: [],
  searchLabel: 'Search',
  emptystate: 'No items found',
  onPagination: () => { },
  activePage: 1,
  pages: 0,
  rowData: [],
  parseFilterRequestStringOutput: null,
  parseFilterItemRequestOutput: null,
  parseFilterKeyRequestOutput: null,
  parseFilterLabelOutput: null,
  displayCount: true,
  exportFileName: '',
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
    parseFilterRequestStringOutput,
    parseFilterItemRequestOutput,
    parseFilterKeyRequestOutput,
    parseFilterLabelOutput,
    displayCount,
    exportFileName,
    ...rest
  } = props;

  const { tableHook } = props;

  return (
    <Wrapper>
      { tableHook.isExporting() && (
        ReactDOM.createPortal(
          <Shield.Dark>
            <Loader>
              <RingSpinner color={theme.blue400} size={50} />
            </Loader>
          </Shield.Dark>,
          modalRoot,
        )
      )}
      { withControlls && (
        <Controlls
          tableHook={tableHook}
          withSort={withSort}
          withFilter={withFilter}
          searchLabel={searchLabel}
          parseFilterRequestStringOutput={parseFilterRequestStringOutput}
          parseFilterItemRequestOutput={parseFilterItemRequestOutput}
          parseFilterKeyRequestOutput={parseFilterKeyRequestOutput}
          parseFilterLabelOutput={parseFilterLabelOutput}
        />
      )}
      <BaseTable
        canExportResults
        exportResultsAction={() => tableHook.exportSearchResult()}
        exportFileName={exportFileName}
        displayCount={displayCount}
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
