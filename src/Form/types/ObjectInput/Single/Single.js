import React, {
  forwardRef, useState, createRef, useImperativeHandle, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import * as C from '../ObjectInput.styled';
import InputWrapper from '../InputWrapper';
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

  const handleChange = ({ target }) => {
    const val = target.type === 'number' ? parseInt(target.value, 10) : target.value;
    const newValue = { ...value, [target.name]: val };
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

      {Object.keys(value).length > 0 && (
      <C.Entry>
        {Object.keys(value).map((key, index) => {
          const option = options[key];
          const entryValidator = validator?.conditions()[key];
          return (
            <InputWrapper
              /* eslint-disable-next-line react/no-array-index-key */
              key={index}
              name={key}
              label={option.label}
              value={value[key]}
              type={option.type}
              onChange={handleChange}
              disabled={option.disabled}
              render={option.render}
              validator={error ? entryValidator : null}
              options={option.options}
              placeholder={option.placeholder}
            />
          );
        })}
      </C.Entry>
      )}
    </C.Container>
  );
});

Single.propTypes = propTypes;
Single.defaultProps = defaultProps;

export default Single;
