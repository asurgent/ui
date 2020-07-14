import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const propTyps = {
  value: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  props: PropTypes.instanceOf(Object),
};

const defaultProps = {
  value: '',
  label: '',
  props: {},
  placeholder: '',
};

const Text = forwardRef((props, ref) => {
  const {
    name,
    placeholder,
  } = props;

  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(props.value || '');
  }, [props]);

  return (
    <input
      {...props.props}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={({ target }) => setValue(target.value)}
      name={name}
      ref={ref}
    />
  );
});

Text.defaultProps = defaultProps;
Text.propTypes = propTyps;
Text.displayName = '@asurgent.ui.Form.Input.Text';

export default Text;
