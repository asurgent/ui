import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as C from './ObjectInput.styled';

const propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.func,
  render: PropTypes.func,
  validator: PropTypes.instanceOf(Object),
  tooltip: PropTypes.string,
  placeholder: PropTypes.string,
};

const defaultProps = {
  label: '',
  value: '',
  options: [],
  type: 'text',
  disabled: () => false,
  render: () => true,
  validator: null,
  tooltip: '',
  placeholder: '',
};

const InputWrapper = (props) => {
  const {
    type,
    label,
    value,
    name,
    disabled,
    render,
    onChange,
    validator,
    options,
    tooltip,
    placeholder,
  } = props;

  const error = useMemo(() => {
    if (validator && validator.valid(value) === false) {
      return validator.errorMessage;
    }
    return null;
  }, [validator, value]);

  if (render()) {
    return (
      <>
        <C.InputContainer type={type} tooltip={tooltip} error={error || false} label={label}>
          {type === 'select' ? (
            <select
              value={value}
              name={name}
              onChange={onChange}
              disabled={disabled()}
            >
              <option disabled value="">
                {placeholder}
              </option>
              {options.map((opt) => <option value={opt.value} key={`${opt.value}-${opt.label}`}>{opt.label}</option>)}
            </select>
          ) : (
            <input
              value={value || ''}
              name={name}
              type={type}
              onChange={onChange}
              disabled={disabled()}
            />
          )}
          {error && <C.Error>{error}</C.Error>}
        </C.InputContainer>
      </>
    );
  }
  return null;
};

InputWrapper.propTypes = propTypes;
InputWrapper.defaultProps = defaultProps;

export default InputWrapper;
