import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from '@material-ui/icons';
import * as Button from '../../../Button';
import * as C from './TableFilter.styled';
import FilterCategory from './FilterCategory';

const propTypes = {
  className: PropTypes.string,
  filterHook: PropTypes.instanceOf(Object).isRequired,
  tableHook: PropTypes.instanceOf(Object).isRequired,
};

const defaultProps = {
  className: '',
};

const TableFilter = ({ filterHook, tableHook, className }) => (
  <C.Wrapper className={className}>
    <C.Filters>
      {
        filterHook.getFilterGroups()
          .map(({ label, facetKey, multiSelect = true }) => (
            label && facetKey && (
              <FilterCategory
                key={facetKey}
                label={label}
                multiSelect={multiSelect}
                filterKey={facetKey}
                filterHook={filterHook}
                tableHook={tableHook}
              />
            )
          ))
      }
    </C.Filters>
    {filterHook.hasActiveFilter() && (
      <Button.Plain onClick={() => filterHook.clearFilter()} disabled={tableHook.isLoading}>
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
