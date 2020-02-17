import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from '@material-ui/icons';
import * as Button from '../../../Button';
import * as C from './FilterItems.styled';
import {
  EXCLUDE,
  INCLUDE,
  REMOVE,
} from '../helpers';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  included: PropTypes.bool,
  excluded: PropTypes.bool,
};

const defaultProps = {
  included: false,
  excluded: false,
};

const FilterItem = ({
  value,
  included,
  excluded,
  onClick,
}) => (
    <C.FilterItem>
      <C.Active>
        {included && <Icons.Check />}
        {excluded && <Icons.Block />}
      </C.Active>
      <Button.Plain className="filter-label" onClick={() => onClick(included ? REMOVE : INCLUDE)}>
        {value}
      </Button.Plain>
      <Button.Plain tooltip="exclude" onClick={() => onClick(excluded ? REMOVE : EXCLUDE)}>
        <C.Exclude>
          <Icons.RemoveCircleOutline />
        </C.Exclude>
      </Button.Plain>
    </C.FilterItem>
  );

FilterItem.propTypes = propTypes;
FilterItem.defaultProps = defaultProps;
FilterItem.displayName = '@asurgent.ui.Table.TableFilter.FilterItem';

export default FilterItem;
