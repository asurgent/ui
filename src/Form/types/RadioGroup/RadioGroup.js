import React, {
  useState,
  createRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import { isNull } from 'lodash';
import * as C from './RadioGroup.styled';

const propTypes = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  wrapRadios: PropTypes.bool,
  parseOutput: PropTypes.func,
  props: PropTypes.instanceOf(Object),
};

const defaultProps = {
  value: '',
  options: [],
  wrapRadios: false,
  props: {},
  parseOutput: (val) => val || '',
};

const RadioGroup = forwardRef((props, ref) => {
  const {
    name,
    options,
    wrapRadios,
    parseOutput,
  } = props;
  const [val, setVal] = useState(null);
  const input = createRef();

  useEffect(() => {
    setVal(props.value);
  }, [props.value]);

  useImperativeHandle(ref, () => ({
    value: parseOutput(val),
    focus: () => input.current.focus(),
    blur: () => input.current.blur(),
  }));

  return (
    <C.FieldSet onChange={({ target }) => setVal(target.value)}>
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
