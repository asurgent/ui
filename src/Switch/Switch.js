
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as C from './Switch.styled';

const defaultSize = 4.8;
const borderSize = 0.2;

const propTypes = {
  value: PropTypes.bool,
  onToggle: PropTypes.func,
  tooltipRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.func,
  ]),
};

const defaultProps = {
  value: false,
  tooltipRef: () => {},
  onToggle: () => {},
  children: null,
};

const Switch = ({
  value,
  onToggle,
  children,
  tooltipRef,
}) => {
  const [internatlValue, setInternatlValue] = useState(false);

  useEffect(() => {
    setInternatlValue(value);
  }, [value]);

  const onClick = () => {
    if (onToggle && typeof onToggle === 'function') {
      onToggle(!internatlValue);
    }

    setInternatlValue(!internatlValue);
  };

  const renderChildren = () => {
    if (typeof children === 'function') {
      return children(internatlValue);
    }

    return children;
  };

  return (
    <>
      {children && <C.Label>{renderChildren()}</C.Label>}

      <C.SwitchWrapper
        ref={tooltipRef}
        onClick={onClick}
        value={internatlValue}
        size={defaultSize}
        borderSize={borderSize}
      >
        <C.Toggle value={internatlValue} borderSize={borderSize} />
      </C.SwitchWrapper>
    </>
  );
};

Switch.propTypes = propTypes;
Switch.defaultProps = defaultProps;
Switch.displayName = '@asurgent.ui.Switch';

export default Switch;
