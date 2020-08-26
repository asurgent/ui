import React, {
  forwardRef,
  useState,
  createRef,
  useEffect,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import { emailRegexp } from './helpers';

const propTyps = {
  value: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  props: PropTypes.instanceOf(Object),
  parseOutput: PropTypes.func,
  validator: PropTypes.func,
};

const defaultProps = {
  value: '',
  label: '',
  props: {},
  placeholder: '',
  parseOutput: (v) => v,
  validator: (v) => emailRegexp.test(v),
};

const Email = forwardRef((props, ref) => {
  const {
    name,
    placeholder,
    parseOutput,
    validator,
  } = props;
  const input = createRef();

  const [value, setValue] = useState('');

  useImperativeHandle(ref, () => ({
    value: parseOutput(value),
    validator: validator(value),
    focus: () => input.current.focus(),
    blur: () => input.current.blur(),
  }));

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  return (
    <input
      {...props.props}
      type="email"
      value={value}
      placeholder={placeholder}
      onChange={({ target }) => setValue(target.value)}
      name={name}
      ref={input}
    />
  );
});

Email.defaultProps = defaultProps;
Email.propTypes = propTyps;
Email.displayName = '@asurgent.ui.Form.Input.Email';

export default Email;
