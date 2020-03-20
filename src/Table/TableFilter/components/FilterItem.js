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
};

const defaultProps = {};

const FilterItem = ({
  filterItem,
  groupHook,
  filterHook,
  multiSelect,
}) => {
  const hook = useFilterItemHook(filterItem, groupHook, filterHook, multiSelect);

  return (
    <C.FilterItem matched={hook.isMatched()}>
      {!filterItem.label && (
        <C.Active>
          {hook.isIncluded() && <Icons.Check />}
          {hook.isExcluded() && <Icons.Block />}
        </C.Active>
      )}
      {!filterItem.label && (
        <Button.Plain className="filter-label" onClick={hook.setStateInclude}>
          {hook.getLabel()}
        </Button.Plain>
      )}
      {filterItem.label && (
        <C.Label>
          {hook.getLabel()}
        </C.Label>
      )}
      { multiSelect && !filterItem.label && !filterItem.static && (
        <C.Exclude>
          <Button.Plain tooltip="exclude" onClick={hook.setStateExclude}>
            <Icons.RemoveCircleOutline />
          </Button.Plain>
        </C.Exclude>
      )}
    </C.FilterItem>
  );
};

FilterItem.propTypes = propTypes;
FilterItem.defaultProps = defaultProps;
FilterItem.displayName = '@asurgent.ui.Table.TableFilter.FilterItem';

export default FilterItem;
