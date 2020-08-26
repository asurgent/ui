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
  validator: PropTypes.func,
};

const defaultProps = {
  value: '',
  props: {},
  placeholder: '',
  parseOutput: (v) => v,
  validator: () => true,
};

const TextArea = forwardRef((props, ref) => {
  const {
    name,
    placeholder,
    parseOutput,
    validator,
  } = props;

  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  useImperativeHandle(ref, () => ({
    value: parseOutput(value),
    validator: validator(value),
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
    />
  );
});

TextArea.defaultProps = defaultProps;
TextArea.propTypes = propTyps;
TextArea.displayName = '@asurgent.ui.Form.Input.TextArea';

export default TextArea;
