import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from '@material-ui/icons';
import * as Button from '../../../Button';
import * as C from './FilterItem.styled';
import useFilterItemHook from '../useFilterItemHook';

const propTypes = {
  filterItem: PropTypes.instanceOf(Object).isRequired,
  groupHook: PropTypes.instanceOf(Object).isRequired,
  filterHook: PropTypes.instanceOf(Object).isRequired,
  multiSelect: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

const defaultProps = {};

const FilterItem = ({
  filterItem,
  groupHook,
  filterHook,
  onChange,
  onAdd,
  multiSelect,
}) => {
  const hook = useFilterItemHook(filterItem, groupHook, filterHook, multiSelect);

  return (
    <C.FilterItem
      matched={hook.isMatched()}
      onClick={() => {
        onChange(filterItem);
        onAdd(filterItem);
        hook.setStateInclude(filterItem);
      }}
    >
      {!filterItem.label && (
        <C.Active>
          {hook.isIncluded() && <Icons.Check />}
          {hook.isExcluded() && <Icons.Block />}
        </C.Active>
      )}
      {!filterItem.label && (
      <C.FilterLabel>
        {hook.getLabel()}
      </C.FilterLabel>

      )}
      {filterItem.label && (
      <C.Label>
        {hook.getLabel()}
      </C.Label>
      )}
      { multiSelect && !filterItem.label && !filterItem.static && (
        <C.Base>
          <C.SecondaryLabel>
            {hook.getCount()}
          </C.SecondaryLabel>
        </C.Base>
      )}
    </C.FilterItem>
  );
};

FilterItem.propTypes = propTypes;
FilterItem.defaultProps = defaultProps;
FilterItem.displayName = '@asurgent.ui.Table.TableFilter.FilterItem';

export default FilterItem;
