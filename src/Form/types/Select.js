import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../../Tooltip';

import {
  Main,
  Icon,
  Label,
  Header,
  SelectWrapper,
} from './Text.styled';

const propTyps = {
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  props: PropTypes.instanceOf(Object),
};

const defaultProps = {
  value: '',
  props: {},
};

const Select = forwardRef((props, ref) => {
  const {
    label,
    name,
    tooltip,
    options,
  } = props;

  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <Main>
      <Header>
        <Label>{label || name}</Label>
        { tooltip && (
        <Tooltip tip={tooltip}>
          <Icon className="far fa-question-circle" />
        </Tooltip>
        )}
      </Header>
      <SelectWrapper>
        <select
          {...props.props}
          type="select"
          onChange={({ target }) => setValue(target.value)}
          value={value}
          name={name}
          ref={ref}
        >
          { Array.isArray(options) && options
            .map(({
              value: optionValue,
              label: optionLabel,
              disabled,
              disabledPreFix,
              disabledPostFix,
            }) => (
              <option key={value} value={optionValue} disabled={disabled}>
                {disabled && disabledPreFix}
                {optionLabel}
                {disabled && disabledPostFix}
              </option>
            ))}
        </select>
      </SelectWrapper>
    </Main>
  );
});

Select.defaultProps = defaultProps;
Select.propTypes = propTyps;
Select.displayName = '@asurgent.ui.Form.Input.Select';

export default Select;
