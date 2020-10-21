import React, {
  forwardRef, useState, createRef, useImperativeHandle, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { set } from 'lodash';
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
};

const defaultProps = {
  options: null,
  value: null,
  parseOutput: (v) => v,
  validator: {
    conditions: () => true,
    errorMessage: 'some error',
  },
};

const Single = forwardRef((props, ref) => {
  const {
    options, name, parseOutput, validator, error,
  } = props;

  const [value, setValue] = useState(props.value || {});
  const [validFields, setValidFields] = useState({});
  const [hasError, setHasError] = useState(false);
  const [invalidFields, setInvalidFields] = useState({});

  useEffect(() => {
    const val = props.value || clearObjectValues(options) || {};
    setValue(val);
  }, [props.value, options]);

  const input = createRef();

  useImperativeHandle(ref, () => ({
    value: () => parseOutput(value),
    validator: () => {
      const fieldWithValidation = validator.conditions();
      const notPassed = Object.keys(fieldWithValidation)
        .reduce((obj, key) => {
          const field = fieldWithValidation[key];
          const val = value[key];
          return (
            { ...obj, ...field.valid(val) === false && { [key]: field } }
          );
        }, {});
      setInvalidFields(notPassed);
      return Object.keys(notPassed).length === 0;
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
          return (
            <>
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
                error={error && invalidFields[key]}
              />
            </>
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

/*
    console.log('ref', ref.current);
    const invalidFields = validator.condition(value);
    console.log('invalidFields', invalidFields);
    setValidFields(invalidFields);
    return invalidFields;
  */

/*
validator: () => {
      const fields = Object.keys(value).reduce((obj, key) => {
        const inputValidator = validator.condition[key];
        return (
          {
            ...obj,
            ...inputValidator && { [key]: inputValidator(value[key]) },
          }
        );
      }, {});
      setValidFields(fields);
    },
*/

/*
 const conditions = Object.keys(validator.conditions);
      const mapped = conditions.map((cond) => validator.conditions[cond](value[cond]));
      console.log('mapped', mapped);
      /* const fields = Object.keys(value).reduce((obj, key) => {
        const inputValidator = validator.conditions[key];
        return (
          {
            ...obj,
            ...inputValidator && { [key]: inputValidator(value[key]) },
          }
        );
      }, {});
      console.log('fuelds', fields);
      return mapped.every((f) => f.true);
*/
