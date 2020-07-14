import React, {
  forwardRef, useState, useEffect, useContext, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { FormContext } from '../../Form';

const propTyps = {
  value: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  props: PropTypes.instanceOf(Object),
};

const defaultProps = {
  value: 0,
  minValue: null,
  maxValue: null,
  label: '',
  props: {},
  placeholder: '',
};

const NumberInput = forwardRef((props, ref) => {
  const {
    name,
    placeholder,
    minValue,
    maxValue,
  } = props;

  const { hook: form } = useContext(FormContext);
  const [value, setValue] = useState(props.value);

  const max = useMemo(() => {
    if (typeof maxValue === 'function') {
      const values = form.valueState;
      return maxValue(values, value);
    }

    return maxValue;
  }, [maxValue, form.valueState, value]);

  const min = useMemo(() => {
    if (typeof minValue === 'function') {
      const values = form.valueState;
      return minValue(values, value);
    }
    return minValue;
  }, [minValue, form.valueState, value]);

  useEffect(() => {
    setValue(parseInt(props.value || 0, 10));
  }, [props]);

  useEffect(() => {
    if ((max && value >= max)) {
      setValue(max);
    } else if (min && value <= min) {
      setValue(min);
    }
  }, [props, max, min, value]);

  // built in min/max for number inputs only prevents valuechanges by using the buttons
  const handleChange = ({ target }) => {
    const requestedValue = target.value;
    let canChange = true;
    if ((max && requestedValue >= max) || (min && requestedValue <= min)) {
      canChange = false;
    }
    setValue(requestedValue);
  };

  return (
    <input
      {...props.props}
      type="number"
      value={value}
      placeholder={placeholder}
      min={min}
      max={max}
      onChange={handleChange}
      name={name}
      ref={ref}
    />
  );
});

NumberInput.defaultProps = defaultProps;
NumberInput.propTypes = propTyps;
NumberInput.displayName = '@asurgent.ui.Form.Input.NumberInput';

export default NumberInput;
