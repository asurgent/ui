import React, {
  forwardRef, useState, createRef, useImperativeHandle, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import * as C from '../ObjectInput.styled';
import FilterSelect from '../../FilterSelect';
import Select from '../../Select';
import Text from '../../Text';
import Number from '../../Number';
import {
  clearObjectValues,
  valuePassedValidation,
} from '../helpers';

const propTypes = {
  options: PropTypes.instanceOf(Object),
  value: PropTypes.instanceOf(Object),
  name: PropTypes.string.isRequired,
  parseOutput: PropTypes.func,
  validator: PropTypes.shape({
    conditions: PropTypes.instanceOf(Object),
    errorMessage: PropTypes.string,
  }),
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.instanceOf(Object),
  ]),
};

const defaultProps = {
  options: null,
  value: null,
  parseOutput: (v) => v,
  validator: {
    conditions: () => true,
    errorMessage: 'some error',
  },
  error: false,
};

const InputWrapper = ({
  option,
  value,
  name,
  onChange,
  type,
  label,
  options,
  disabled,
  render,
  validator,
  placeholder,
}) => {
  switch (type) {
    case 'filterselect':
      return (
        <FilterSelect
          name={name}
          onChange={onChange}
          disabled={disabled}
          render={render}
          validator={validator}
          placeholder={placeholder}
          label={label}
          options={options}
          props={option.props}
          value={value}
        />
      );
    case 'number':
      return <Number name={name} onChange={onChange} label={label} value={value} />;
    case 'select':
      return <Select name={name} onChange={onChange} label={label} value={value} />;
    default:
      return <Text type="text" onChange={onChange} name={name} label={label} value={value} />;
  }
};

const Single = forwardRef((props, ref) => {
  const {
    options, name, parseOutput, validator, error,
  } = props;

  const [value, setValue] = useState(props.value || {});

  useEffect(() => {
    const val = props.value || clearObjectValues(options) || {};
    setValue(val);
  }, [props.value, options]);

  const input = createRef();

  useImperativeHandle(ref, () => ({
    validationErrorMessage: validator.errorMessage,
    value: () => parseOutput(value),
    validator: () => valuePassedValidation({ validators: validator.conditions(), value }),
  }));

  const handleChange = ({ name, val, type }) => {
    const newValue = { ...value, [name]: val };
    setValue(newValue);
  };

  return (
    <C.Container>
      <input
        style={{ display: 'none' }}
        ref={input}
        value={value}
        name={name}
        readOnly
      />

      <C.Entry>
        {Object.keys(options)?.map((key) => {
          const option = options[key];
          const entryValidator = validator?.conditions()[key];
          return (
            <C.InputContainer key={key} type={option.type} error={error || false} label={option.label}>
              {/* tooltip={tooltip} */}
              <InputWrapper
                name={key}
                option={option}
                type={option.type}
                value={value[key]}
                label={option.label}
                options={option.options}
                disabled={option.disabled}
                render={option.render}
                validator={error ? entryValidator : null}
                placeholder={option.placeholder}
                onChange={handleChange}
              />
            </C.InputContainer>
          );
        })}
      </C.Entry>

    </C.Container>
  );
});

Single.propTypes = propTypes;
Single.defaultProps = defaultProps;

export default Single;
