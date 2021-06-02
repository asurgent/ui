import React from 'react';
import PropTypes from 'prop-types';
import MdiIcon from '@mdi/react';
import { mdiCheck } from '@mdi/js';
import * as C from './FilterSelectItem.styled';

const propTypes = {
  filterItem: PropTypes.instanceOf(Object).isRequired,
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {};

const FilterItem = ({
  filterItem,
  onChange,
}) => (
  <C.FilterItem
    onClick={() => !filterItem.disabled && onChange(filterItem)}
    disabled={filterItem.disabled}
  >
    <C.Active>
      {filterItem.selected && <MdiIcon path={mdiCheck} size={0.75} />}
    </C.Active>
    <C.FilterLabel>
      <span>{ filterItem.label }</span>
    </C.FilterLabel>
  </C.FilterItem>
);

FilterItem.propTypes = propTypes;
FilterItem.defaultProps = defaultProps;

export default FilterItem;
