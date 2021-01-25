import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as C from './ObjectInput.styled';
import FilterSelect from '../FilterSelect';
import Select from '../Select';
import Text from '../Text';
import Number from '../Number';

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

const inputType = (type, props, label, value) => {
  switch (type) {
    case 'filterselect':
      return <FilterSelect label={label} value={value} {...props} />;
    case 'number':
      return <Number label={label} value={value} {...props} />;
    case 'select':
      return <Select label={label} value={value} {...props} />;
    default:
      return <Text label={label} value={value} {...props} />;
  }
};

const InputWrapper = (props) => {
  const {
    type,
    label,
    value,
    render,
    validator,
    tooltip,
    ...rest
  } = props;
  console.log('rest', rest);

  const error = useMemo(() => {
    if (validator?.valid && validator?.valid(value) === false) {
      return validator.errorMessage;
    }
    return null;
  }, [validator, value]);

  if (render()) {
    return (
      <>
        <C.InputContainer type={type} tooltip={tooltip} error={error || false} label={label}>
          {inputType(type, rest, label, value)}
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
