import React, {
  useState,
  useEffect,
  createRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import * as C from './Switch.styled';

const defaultSize = 3;
const borderSize = 0.125;

const propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool,
  parseOutput: PropTypes.func,
  validator: PropTypes.instanceOf(Object),
  disabled: PropTypes.func,
};

const defaultProps = {
  value: false,
  parseOutput: (v) => v,
  validator: {
    condition: () => true,
    errorMessage: '',
  },
  disabled: () => false,
};

const Switch = forwardRef((props, ref) => {
  const {
    name,
    parseOutput,
    validator,
    disabled,
  } = props;

  const input = createRef();
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const dispatchEvent = (d) => {
    const element = input.current;
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeInputValueSetter.call(element, d);
    const inputEvent = new Event('input', { bubbles: true });
    element.dispatchEvent(inputEvent);
  };

  useImperativeHandle(ref, () => ({
    value: () => parseOutput(value),
    validator: () => validator.condition(value),
    validationErrorMessage: validator.errorMessage,
    focus: () => input.current.focus(),
    blur: () => input.current.blur(),
  }));

  const onClick = () => {
    if (!disabled()) {
      const newValue = !value;
      setValue(newValue);
      dispatchEvent(newValue);
    }
  };

  return (

    <C.SwitchWrapper
      onClick={onClick}
      value={value}
      size={defaultSize}
      borderSize={borderSize}
    >
      <C.Toggle value={value} borderSize={borderSize} />
      <input type="text" style={{ display: 'none' }} readOnly name={name} value={value} ref={input} />
    </C.SwitchWrapper>

  );
});

Switch.propTypes = propTypes;
Switch.defaultProps = defaultProps;

export default Switch;
