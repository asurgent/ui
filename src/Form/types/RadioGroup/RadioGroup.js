import React, {
  useState,
  createRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import * as C from './RadioGroup.styled';

const propTypes = {
  value: PropTypes.bool,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  wrapRadios: PropTypes.bool,
  parseOutput: PropTypes.func,
  props: PropTypes.instanceOf(Object),
  disabled: PropTypes.func,
  onChange: PropTypes.func,
};

const defaultProps = {
  value: null,
  options: [],
  wrapRadios: false,
  props: {},
  parseOutput: (val) => val || '',
  disabled: () => false,
  onChange: () => null,
};

const RadioGroup = forwardRef((props, ref) => {
  const {
    name,
    options,
    wrapRadios,
    parseOutput,
    disabled,
    onChange,
  } = props;

  const [val, setVal] = useState(props.value || null);
  const input = createRef();

  useEffect(() => {
    setVal(props.value);
  }, [props.value]);

  useImperativeHandle(ref, () => ({
    value: () => parseOutput(val),
    focus: () => input.current.focus(),
    blur: () => input.current.blur(),
  }));

  return (
    <C.FieldSet onChange={({ target }) => {
      const isBool = target.value.toLowerCase().includes('true', 'false');
      const value = isBool ? target.value === 'true' : target.value;
      setVal(value);
      onChange({ inputName: name, inputValue: value });
    }}
    >
      <C.RadioWrapper wrapRadios={wrapRadios}>
        {options.map((opt) => (
          <C.Label key={opt.label || opt.value}>
            <C.RadioInput
              type="radio"
              name={name}
              value={opt.value}
              checked={val === opt.value}
              ref={val === opt.value ? input : null}
              readOnly
              disabled={disabled()}
              {...props.props}
            />
            <C.CheckMark />
            <C.Text>{opt.label}</C.Text>
          </C.Label>
        ))}
      </C.RadioWrapper>
    </C.FieldSet>
  );
});

RadioGroup.propTypes = propTypes;
RadioGroup.defaultProps = defaultProps;
RadioGroup.displayName = '@asurgent.ui.RadioGroup';

export default RadioGroup;
