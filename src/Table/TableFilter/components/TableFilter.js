import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from '@material-ui/icons';
import * as Button from '../../../Button';
import * as C from './TableFilter.styled';
import FilterCategory from './FilterCategory';

const propTypes = {
  filterHook: PropTypes.instanceOf(Object).isRequired,
  tableHook: PropTypes.instanceOf(Object).isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

const TableFilter = ({ filterHook, tableHook, className }) => (
  <C.Wrapper className={className}>
    <C.Filters>
      {
      filterHook.filterGroups
        .map(({ label, facetKey }) => (
          label && facetKey && (
          <FilterCategory
            key={facetKey}
            label={label}
            filterKey={facetKey}
            filterHook={filterHook}
            tableHook={tableHook}
          />
          )
        ))
    }
    </C.Filters>
    { filterHook.hasActiveFilter() && (
      <Button.Plain onClick={() => filterHook.clearFilter()}>
        <Icons.HighlightOff fontSize="large" />
        {' '}
        Clear Filter
      </Button.Plain>
    )}
  </C.Wrapper>
);
TableFilter.propTypes = propTypes;
TableFilter.defaultProps = defaultProps;
TableFilter.displayName = '@asurgent.ui.Table.TableFilter';

export default TableFilter;
