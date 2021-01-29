import React, {
  forwardRef, useState, createRef, useImperativeHandle, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import * as C from '../ObjectInput.styled';

import {
  valuePassedValidation,
  getInputComponent,
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

const Single = forwardRef((props, ref) => {
  const {
    options, name, parseOutput, validator, error,
  } = props;

  const [value, setValue] = useState(props.value || {});

  const setValuesFromOptions = (opt) => Object.entries(opt).reduce((acc, cur) => {
    const key = cur[0];
    const { value: optionValue } = cur[1];
    return { ...acc, [key]: optionValue || null };
  }, {});

  useEffect(() => {
    const val = setValuesFromOptions(options) || {};
    setValue(val);
  }, [props.value, options]);

  const input = createRef();

  useImperativeHandle(ref, () => ({
    validationErrorMessage: validator.errorMessage,
    value: () => parseOutput(value),
    validator: () => valuePassedValidation({ validators: validator.conditions(), value }),
  }));

  const handleChange = ({ inputName, inputValue }) => {
    const newValue = { ...value, [inputName]: inputValue };
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
          const InputComponent = getInputComponent(option.type);

          return (
            <C.InputContainer
              key={key}
              type={option.type}
              error={error || false}
              label={option.label}
            >
              {/* tooltip={tooltip} */}
              <InputComponent
                name={key}
                option={option}
                type={option.type}
                value={option.value}
                label={option.label}
                options={option.options}
                disabled={option.disabled}
                render={option.render}
                validator={error ? entryValidator : null}
                placeholder={option.placeholder}
                onChange={handleChange}
                props={option.props}
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
