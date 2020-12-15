import React, {
  forwardRef, useState, useEffect, useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';

const propTyps = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  props: PropTypes.instanceOf(Object),
  parseOutput: PropTypes.func,
  validator: PropTypes.shape({
    condition: PropTypes.func,
    errorMessage: PropTypes.string,
  }),
  disabled: PropTypes.func,
};

const defaultProps = {
  value: '',
  props: {},
  placeholder: '',
  parseOutput: (v) => v,
  validator: {
    condition: () => true,
    errorMessage: '',
  },
  disabled: () => false,
};

const TextArea = forwardRef((props, ref) => {
  const {
    name,
    placeholder,
    parseOutput,
    validator,
    disabled,
  } = props;

  const [value, setValue] = useState(props.value || '');

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  useImperativeHandle(ref, () => ({
    value: () => parseOutput(value),
    validator: validator.condition(value),
    validationErrorMessage: validator.errorMessage,
  }));

  return (
    <textarea
      {...props.props}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={({ target }) => setValue(target.value)}
      name={name}
      autoComplete="off"
      disabled={disabled()}
    />
  );
});

TextArea.defaultProps = defaultProps;
TextArea.propTypes = propTyps;
TextArea.displayName = '@asurgent.ui.Form.Input.TextArea';

export default TextArea;
