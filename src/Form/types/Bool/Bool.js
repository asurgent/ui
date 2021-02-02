import React, {
  forwardRef,
  useState,
  useEffect,
  useCallback,
  createRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import translation from './Bool.translation';
import * as C from '../RadioGroup/RadioGroup.styled';

const propTyps = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  props: PropTypes.instanceOf(Object),
  disabled: PropTypes.func,
  onChange: PropTypes.func,
};

const defaultProps = {
  value: false,
  label: '',
  props: {},
  disabled: () => false,
  onChange: () => null,
};

const { t } = translation;

const options = [
  { label: t('yes', 'asurgentui'), value: true },
  { label: t('no', 'asurgentui'), value: false },
];

const Bool = forwardRef((props, ref) => {
  const {
    name, label, disabled, onChange, value,
  } = props;

  useEffect(() => {
    setVal(value);
  }, [value]);

  const handleChange = ({ inputValue }) => {
    onChange({ inputValue: inputValue === 'true', inputName: name });
  };

  const [val, setVal] = useState(value);
  const input = createRef();

  useEffect(() => {
    setVal(value);
  }, [value]);

  useImperativeHandle(ref, () => ({
    value: () => parseOutput(val),
    focus: () => input.current.focus(),
    blur: () => input.current.blur(),
  }));

  return (
    <C.FieldSet>
      <C.RadioWrapper>
        {options.map((opt) => (
          <C.Label key={opt.label || opt.value}>
            <C.RadioInput
              type="radio"
              name={name}
              value={opt.value}
              checked={val === opt.value}
              ref={input}
              readOnly
              onClick={handleChange}
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

Bool.defaultProps = defaultProps;
Bool.propTypes = propTyps;
Bool.displayName = '@asurgent.ui.Form.Input.Bool';

export default Bool;
