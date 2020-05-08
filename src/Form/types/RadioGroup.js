
import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as C from './RadioGroup.styled';
import { TooltipIcon } from './Text.styled';
import * as Tooltip from '../../Tooltip';

const propTypes = {
  value: PropTypes.string,
  // label is required since it serves as an ID
  label: PropTypes.string.isRequired,
  noLabel: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  wrapRadios: PropTypes.bool,
  tooltip: PropTypes.string,
};

const defaultProps = {
  value: '',
  noLabel: false,
  options: [],
  wrapRadios: false,
  tooltip: '',
};

const RadioGroup = forwardRef((props, ref) => {
  const {
    value, label, noLabel, tooltip, options, wrapRadios,
  } = props;
  const [val, setVal] = useState(null);

  useEffect(() => {
    setVal(value || '');
  }, [value]);

  return (
    <>
      {noLabel === false && (
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
          <C.Label key={label + opt.label}>
            <C.RadioInput
              type="radio"
              name={`${label}-${opt.label}`}
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
