import React from 'react';
import PropTypes from 'prop-types';
import * as C from './ObjectInput.styled';

const propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const InputWrapper = ({
  type, label, value, name, onChange,
}) => (
  <C.InputContainer>
    <small>{label}</small>
    <input
      value={value}
      name={name}
      type={type}
      onChange={onChange}
    />
  </C.InputContainer>
);

InputWrapper.propTypes = propTypes;

export default InputWrapper;
