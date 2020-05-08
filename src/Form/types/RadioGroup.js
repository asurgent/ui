
import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as C from './RadioGroup.styled';
import { TooltipIcon } from './Text.styled';
import * as Tooltip from '../../Tooltip';

const propTypes = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  wrapRadios: PropTypes.bool,
  tooltip: PropTypes.string,
};

const defaultProps = {
  value: '',
  label: '',
  options: [],
  wrapRadios: false,
  tooltip: '',
};

const RadioGroup = forwardRef((props, ref) => {
  const {
    name, value, label, tooltip, options, wrapRadios,
  } = props;
  const [val, setVal] = useState(null);

  useEffect(() => {
    setVal(value || '');
  }, [value]);

  return (
    <>
      {label && (
      <C.Header>
        <C.Label>{label}</C.Label>
        { tooltip && (
        <Tooltip.Middle tip={tooltip}>
          <TooltipIcon />
        </Tooltip.Middle>
        )}
      </C.Header>
      )}

      <C.RadioWrapper wrapRadios={wrapRadios}>
        {options.map((opt) => (
          <C.Label key={opt.label || opt.value}>
            <C.RadioInput
              type="radio"
              name={name}
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
    </>
  );
});

RadioGroup.propTypes = propTypes;
RadioGroup.defaultProps = defaultProps;
RadioGroup.displayName = '@asurgent.ui.RadioGroup';

export default RadioGroup;
