import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const propTyps = {
  value: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  props: PropTypes.instanceOf(Object),
};

const defaultProps = {
  value: 0,
  minValue: null,
  maxValue: null,
  label: '',
  props: {},
};

const Number = forwardRef((props, ref) => {
  const {
    name,
    placeholder,
    minValue,
    maxValue,
  } = props;

  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(parseInt(props.value || 0, 10));
  }, [props]);

  // built in min/max for number inputs only prevents valuechanges by using the buttons
  const handleChange = ({ target }) => {
    let canChange = true;
    if ((maxValue && target.value > maxValue) || (minValue && target.value < minValue)) {
      canChange = false;
    }
    if (canChange) {
      setValue(target.value);
    }
  };

  return (
    <input
      {...props.props}
      type="number"
      value={value}
      placeholder={placeholder}
      min={minValue}
      max={maxValue}
      onChange={handleChange}
      name={name}
      ref={ref}
    />
  );
});

Number.defaultProps = defaultProps;
Number.propTypes = propTyps;
Number.displayName = '@asurgent.ui.Form.Input.Number';

export default Number;
