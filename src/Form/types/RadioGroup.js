
import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as C from './RadioGroup.styled';

const radioPropTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

const radioDefaultProps = {
  label: '',
  checked: false,
  onChange: () => {},
};


const Radio = ({ label, checked, onChange }) => (
  <C.Label>
    <C.RadioInput
      type="radio"
      name={label}
      value={label}
      checked={checked}
      onChange={onChange}
    />
    <C.CheckMark />
    <C.Text>{label}</C.Text>
  </C.Label>
);

Radio.propTypes = radioPropTypes;
Radio.defaultProps = radioDefaultProps;

const propTypes = {
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  wrapRadios: PropTypes.bool,
};

const defaultProps = {
  value: '',
  options: [],
  wrapRadios: false,
};

const RadioGroup = forwardRef((props, ref) => {
  const { value, options, wrapRadios } = props;
  const [val, setVal] = useState(null);

  useEffect(() => {
    setVal(value || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <C.RadioWrapper wrapRadios={wrapRadios}>
      {options.map((opt, ind) => (
        <C.Label key={opt.label || `radio-${ind}`}>
          <C.RadioInput
            type="radio"
            name={opt.label}
            value={opt.value}
            checked={val === opt.value}
            onChange={() => setVal(opt.value)}
            ref={val === opt.value ? ref : null}
          />
          <C.CheckMark />
          <C.Text>{opt.label}</C.Text>
        </C.Label>
      ))}
    </C.RadioWrapper>
  );
});

RadioGroup.propTypes = propTypes;
RadioGroup.defaultProps = defaultProps;
RadioGroup.displayName = '@asurgent.ui.RadioGroup';

export default RadioGroup;
