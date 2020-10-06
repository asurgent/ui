import React, {
  useMemo,
  useState,
  useEffect,
  createRef,
  forwardRef,
  useContext,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import { FormContext } from '../../Form';

const propTyps = {
  value: PropTypes.number,
  minValue: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  maxValue: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
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
};

const defaultProps = {
  value: 0,
  minValue: null,
  maxValue: null,
  label: '',
  props: {},
  placeholder: '',
  parseOutput: (v) => v,
  validator: {
    condition: () => true,
    errorMessage: '',
  },
  disabled: () => false,
};

const NumberInput = forwardRef((props, ref) => {
  const {
    name,
    placeholder,
    minValue,
    maxValue,
    parseOutput,
    validator,
    disabled,
  } = props;
  const input = createRef();
  const { hook: form } = useContext(FormContext);
  const [value, setValue] = useState(parseInt(props.value || 0, 10));

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
  }, [props.value]);

  // built in min/max for number inputs only prevents valuechanges by using the buttons
  useEffect(() => {
    if ((max && value >= max)) {
      setValue(max);
    } else if (min && value <= min) {
      setValue(min);
    }
  }, [props, max, min, value]);

  useImperativeHandle(ref, () => ({
    value: () => parseOutput(value),
    validator: () => validator.condition(value),
    validationErrorMessage: validator.errorMessage,
    focus: () => input.current.focus(),
    blur: () => input.current.blur(),
  }));

  const dispatchEvent = (d) => {
    const element = input.current;
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeInputValueSetter.call(element, d);
    const inputEvent = new Event('input', { bubbles: true });
    element.dispatchEvent(inputEvent);
  };

  return (
    <input
      {...props.props}
      type="number"
      value={value}
      placeholder={placeholder}
      min={min}
      max={max}
      onBlur={({ target }) => {
        const num = parseInt(target.value, 10);
        if (Number.isNaN(num)) {
          setValue(0);
          dispatchEvent(0);
        }
      }}
      onChange={({ target }) => {
        const num = parseInt(target.value, 10);
        setValue(Number.isNaN(num) ? '' : num);
      }}
      name={name}
      ref={input}
      disabled={disabled()}
    />
  );
});

NumberInput.defaultProps = defaultProps;
NumberInput.propTypes = propTyps;
NumberInput.displayName = '@asurgent.ui.Form.Input.NumberInput';

export default NumberInput;
