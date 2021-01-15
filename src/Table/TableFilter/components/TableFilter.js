import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from '@material-ui/icons';
import * as Button from '../../../Button';
import * as C from './TableFilter.styled';
import FilterCategory from './FilterCategory';
import translation from '../TableFilter.translation';

const { t } = translation;

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
          .map(({
            label,
            facetKey,
            multiSelect = true,
            ...rest
          }) => (
            label && facetKey && (
              <FilterCategory
                key={facetKey}
                label={label}
                multiSelect={multiSelect}
                filterKey={facetKey}
                filterHook={filterHook}
                tableHook={tableHook}
                onChange={rest.onChange}
                onAdd={rest.onAdd}
              />
            )
          ))
      }
    </C.Filters>
    {filterHook.hasActiveFilter() && (
      <Button.Plain onClick={() => filterHook.clearFilter()} disabled={tableHook.isLoading}>
        <Icons.HighlightOff />
        {` ${t('clear', 'asurgentui')}`}
      </Button.Plain>
    )}
  </C.Wrapper>
);

TableFilter.propTypes = propTypes;
TableFilter.defaultProps = defaultProps;
TableFilter.displayName = '@asurgent.ui.Table.TableFilter';

export default TableFilter;
