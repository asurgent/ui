
import React from 'react';
import PropTypes from 'prop-types';
import * as C from './RadioGroup.styled';

const radioPropTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

const radioDefaultProps = {
  label: '',
  checked: false,
  onChange: () => {},
};


const Radio = ({ label, checked, onChange }) => (
  <C.Label>
    <C.RadioInput
      type="radio"
      name={label}
      checked={checked}
      onChange={onChange}
    />
    <C.CheckMark />
    <C.Text>{label}</C.Text>
  </C.Label>
);

Radio.propTypes = radioPropTypes;
Radio.defaultProps = radioDefaultProps;

const propTypes = {
  options: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  wrapRadios: PropTypes.bool,
};

const defaultProps = {
  options: [],
  wrapRadios: false,
};

const RadioGroup = ({ options, wrapRadios }) => (
  <C.RadioWrapper wrapRadios={wrapRadios}>
    {options.map((opt, ind) => (
      <Radio
        key={opt.label || `radio-${ind}`}
        label={opt.label}
        checked={opt.checked}
        onChange={opt.onChange}
      />
    ))}
  </C.RadioWrapper>
);

RadioGroup.propTypes = propTypes;
RadioGroup.defaultProps = defaultProps;
RadioGroup.displayName = '@asurgent.ui.RadioGroup';

export default RadioGroup;
