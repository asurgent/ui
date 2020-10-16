import React from 'react';
import PropTypes from 'prop-types';
import * as C from './ObjectInput.styled';

const propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.func,
  render: PropTypes.func,
};

const defaultProps = {
  label: '',
  value: '',
  type: 'text',
  disabled: () => false,
  render: () => true,
};

const InputWrapper = ({
  type, label, value, name, disabled, render, onChange,
}) => {
  if (render()) {
    return (
      <C.InputContainer>
        <small>{label}</small>
        <input
          value={value}
          name={name}
          type={type}
          onChange={onChange}
          disabled={disabled()}
        />
      </C.InputContainer>
    );
  }
  return null;
};

InputWrapper.propTypes = propTypes;
InputWrapper.defaultProps = defaultProps;

export default InputWrapper;
