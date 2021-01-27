import React, {
  forwardRef,
  useState,
  useEffect,
  useImperativeHandle,
  createRef,
} from 'react';
import PropTypes from 'prop-types';

const propTyps = {
  value: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  props: PropTypes.instanceOf(Object),
  parseOutput: PropTypes.func,
  validator: PropTypes.shape({
    condition: PropTypes.func,
    errorMessage: PropTypes.string,
  }),
  disabled: PropTypes.func,
  onChange: PropTypes.func,
};

const defaultProps = {
  value: '',
  label: '',
  props: {},
  placeholder: '',
  parseOutput: (v) => v,
  validator: {
    condition: () => true,
    errorMessage: '',
  },
  disabled: () => false,
  onChange: () => null,
};

const Text = forwardRef((props, ref) => {
  const {
    name,
    placeholder,
    parseOutput,
    validator,
    disabled,
    onChange,
  } = props;
  const input = createRef();
  const [value, setValue] = useState(props.value || '');

  useImperativeHandle(ref, () => ({
    value: () => parseOutput(value),
    validator: () => validator.condition(value),
    validationErrorMessage: validator.errorMessage,
    focus: () => input.current.focus(),
    blur: () => input.current.blur(),
  }));

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  const handleChange = ({ target }) => {
    setValue(target.value);
    onChange({ inputName: target.name, inputValue: target.value });
  };

  return (
    <input
      {...props.props}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      name={name}
      ref={input}
      disabled={disabled()}
    />
  );
});

Text.defaultProps = defaultProps;
Text.propTypes = propTyps;
Text.displayName = '@asurgent.ui.Form.Input.Text';

export default Text;
