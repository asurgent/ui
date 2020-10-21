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
  error: PropTypes.instanceOf(Object),
};

const defaultProps = {
  label: '',
  value: '',
  type: 'text',
  disabled: () => false,
  render: () => true,
  error: null,
};

const InputWrapper = (props) => {
  const {
    type, label, value, name, disabled, render, onChange, error,
  } = props;
  if (render()) {
    return (
      <C.InputContainer hasError={error}>
        <small>{label}</small>
        <input
          value={value}
          name={name}
          type={type}
          onChange={onChange}
          disabled={disabled()}
        />
        {error && <C.Error>{error?.errorMessage}</C.Error>}
      </C.InputContainer>
    );
  }
  return null;
};

InputWrapper.propTypes = propTypes;
InputWrapper.defaultProps = defaultProps;

export default InputWrapper;
