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
    condition: PropTypes.func,
    errorMessage: PropTypes.string,
  }),
};

const defaultProps = {
  options: null,
  value: null,
  parseOutput: (v) => v,
  validator: {
    condition: () => true,
    errorMessage: '',
  },
};

const Single = forwardRef((props, ref) => {
  const {
    options, name, parseOutput, validator,
  } = props;
  const [value, setValue] = useState(props.value || {});

  useEffect(() => {
    const val = props.value || clearObjectValues(options) || {};
    setValue(val);
  }, [props.value, options]);

  const input = createRef();

  useImperativeHandle(ref, () => ({
    value: () => parseOutput(value),
    validator: () => validator.condition(value),
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
        {Object.keys(value).map((key, index) => (
          <InputWrapper
                  /* eslint-disable-next-line react/no-array-index-key */
            key={index}
            name={key}
            label={key}
            value={value[key]}
            type={options[key] === 'number' ? 'number' : 'string'}
            onChange={handleChange}
          />
        ))}
      </C.Entry>
      )}
    </C.Container>
  );
});

Single.propTypes = propTypes;
Single.defaultProps = defaultProps;

export default Single;
