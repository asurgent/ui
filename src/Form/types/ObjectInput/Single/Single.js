import React, {
  forwardRef, useState, createRef, useImperativeHandle, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import * as C from '../ObjectInput.styled';
import InputWrapper from '../InputWrapper';
import { clearObjectValues } from '../helpers';

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
    value: () => parseOutput(value),
    validator: () => {
      const fieldWithValidation = validator.conditions();
      const allPassed = Object.keys(fieldWithValidation)
        .every((key) => fieldWithValidation[key].valid(value[key]));
      return allPassed;
    },
    validationErrorMessage: validator.errorMessage,
  }));

  const handleChange = ({ target }) => {
    const newValue = { ...value, [target.name]: target.value };
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
              validator={error && entryValidator}
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
