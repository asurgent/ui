import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from '@material-ui/icons';
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
      {filterItem.selected && <Icons.Check />}
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
