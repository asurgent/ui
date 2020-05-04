import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from '@material-ui/icons';
import * as Button from '../../../Button';
import * as C from './FilterItem.styled';
import useFilterItemHook from '../useFilterItemHook';
import translation from '../TableFilter.translation';

const { t } = translation;

const propTypes = {
  filterItem: PropTypes.instanceOf(Object).isRequired,
  groupHook: PropTypes.instanceOf(Object).isRequired,
  filterHook: PropTypes.instanceOf(Object).isRequired,
  multiSelect: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

const defaultProps = {};

const FilterItem = ({
  filterItem,
  groupHook,
  filterHook,
  onChange,
  onAdd,
  onRemove,
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
        <Button.Plain
          className="filter-label"
          onClick={() => {
            onChange(filterItem);
            onAdd(filterItem);
            hook.setStateInclude(filterItem);
          }}
        >
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
          <Button.Plain
            tooltip={t('exclude', 'asurgentui')}
            onClick={() => {
              onChange(filterItem);
              onRemove(filterItem);
              hook.setStateExclude(filterItem);
            }}
          >
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
