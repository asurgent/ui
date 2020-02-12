import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from '@material-ui/icons';
import * as Button from '../../Button';
import * as C from './TableFilter.styled';
import FilterCategory from './components/FilterCategory';

const propTypes = {
  filterHook: PropTypes.instanceOf(Object).isRequired,
};

const defaultProps = {};

const TableFilter = ({ filterHook }) => (
  <C.Wrapper>
    <C.Filters>
      {
      filterHook.getFilterCategories()
        .map(({ label, facetKey }) => (
          label && facetKey && (
          <FilterCategory
            key={facetKey}
            label={label}
            filterKey={facetKey}
            filterHook={filterHook}
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
