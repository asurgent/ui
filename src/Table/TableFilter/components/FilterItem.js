import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Icons from '@material-ui/icons';
import * as C from './FilterItem.styled';
import translation from '../TableFilter.translation';
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

const { t } = translation;

const FilterItem = ({
  filterItem,
  groupHook,
  filterHook,
  onChange,
  onAdd,
  multiSelect,
}) => {
  const hook = useFilterItemHook(filterItem, groupHook, filterHook, multiSelect);

  useEffect(() => {
    if (filterItem.selected) {
      hook.setStateInclude(filterItem);
    }
  }, [filterItem, hook]);

  return (
    <C.FilterItem
      matched={hook.isMatched()}
      disabled={filterItem.static || filterItem.label}
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
        <C.Labels>
          <C.Label>
            {hook.getLabel()}
          </C.Label>
          <C.Base>
            <C.Label>
              {t('hits', 'asurgentui')}
            </C.Label>
          </C.Base>
        </C.Labels>
      )}
      { !filterItem.label && !filterItem.static && (
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
