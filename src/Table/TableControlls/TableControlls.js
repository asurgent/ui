import React from 'react';
import PropTypes from 'prop-types';
import TableSearchBar from '../TableSearchBar';
import TableSort from '../TableSort';
import TableFilter from '../TableFilter';
import * as C from './TableControlls.styled';


const propTypes = {
  tableHook: PropTypes.instanceOf(Object).isRequired,
  withSearch: PropTypes.bool,
  withFilter: PropTypes.instanceOf(Array),
  withSort: PropTypes.instanceOf(Array),
  searchLabel: PropTypes.string,
};

const defaultProps = {
  withSort: [],
  withSearch: true,
  withFilter: [],
  searchLabel: 'Search',
};

const TableControlls = ({
  tableHook,
  withSort,
  withSearch,
  withFilter,
  searchLabel,
  parseFilter,
}) => (
  <C.Controllbar>
    { withSearch && (
      <TableSearchBar
        className="search"
        tableHook={tableHook}
        searchLabel={searchLabel}
      />
    )}
    { withSort && Array.isArray(withSort) && withSort.length > 0
      && (
      <TableSort
        className="sort"
        tableHook={tableHook}
        sortKeys={withSort}
      />
      )}
    { withFilter && Array.isArray(withFilter) && withFilter.length > 0 && (
      <TableFilter
        className="filter"
        tableHook={tableHook}
        filterKeys={withFilter}
        parseFilter={parseFilter}
      />
    )}
  </C.Controllbar>
);


TableControlls.propTypes = propTypes;
TableControlls.defaultProps = defaultProps;
TableControlls.displayName = '@asurgent.ui.Table.Controlls';

export default TableControlls;
