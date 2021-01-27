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
  <C.FilterItem onClick={() => onChange(filterItem)}>
    <C.Active>
      {filterItem.selected && <MdiIcon path={mdiCheck} size={1.4} />}
    </C.Active>
    <C.FilterLabel>
      { filterItem.label }
    </C.FilterLabel>
  </C.FilterItem>
);

FilterItem.propTypes = propTypes;
FilterItem.defaultProps = defaultProps;
FilterItem.displayName = '@asurgent.ui.Form.FilterSelect.FilterSelectItem';

export default FilterItem;
