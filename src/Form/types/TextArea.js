import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const propTyps = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  props: PropTypes.instanceOf(Object),
};

const defaultProps = {
  value: '',
  props: {},
  placeholder: '',
};

const TextArea = forwardRef((props, ref) => {
  const {
    name,
    placeholder,
  } = props;

  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  return (
    <textarea
      {...props.props}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={({ target }) => setValue(target.value)}
      name={name}
      ref={ref}
      autoComplete="off"
    />
  );
});


TextArea.defaultProps = defaultProps;
TextArea.propTypes = propTyps;
TextArea.displayName = '@asurgent.ui.Form.Input.TextArea';

export default TextArea;
