import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from '@material-ui/icons';
import * as Button from '../../../Button';
import * as C from './FilterItem.styled';
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
  matched: PropTypes.bool,
};

const defaultProps = {
  included: false,
  excluded: false,
  matched: true,
};

const FilterItem = ({
  value,
  included,
  excluded,
  onClick,
  matched,
}) => (
  <C.FilterItem matched={matched}>
    <C.Active>
      {included && <Icons.Check />}
      {excluded && <Icons.Block />}
    </C.Active>
    <Button.Plain className="filter-label" onClick={() => onClick(included ? REMOVE : INCLUDE)}>
      {value}
    </Button.Plain>
    <C.Exclude>
      <Button.Plain tooltip="exclude" onClick={() => onClick(excluded ? REMOVE : EXCLUDE)}>
        <Icons.RemoveCircleOutline />
      </Button.Plain>
    </C.Exclude>
  </C.FilterItem>
);

FilterItem.propTypes = propTypes;
FilterItem.defaultProps = defaultProps;
FilterItem.displayName = '@asurgent.ui.Table.TableFilter.FilterItem';

export default FilterItem;
