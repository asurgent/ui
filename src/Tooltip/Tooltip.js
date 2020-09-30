import React, { createRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import * as C from './Tooltip.styled';
import { positions, getCoordinates } from './helpers';

const tooltipRoot = document.getElementById('tooltip-root');

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  tip: PropTypes.string,
  position: PropTypes.string,
};

const defaultProps = {
  tip: '',
  position: positions.middle,
  children: null,
};

const Tooltip = ({ position, tip, children }) => {
  const [show, setShow] = useState(false);
  const [coordinates, setCoordinates] = useState({ left: 0, top: 0 });

  const ref = createRef(null);

  const handleMouseEnter = () => {
    if (ref.current != null) {
      const coords = getCoordinates({ position, ref });
      setCoordinates(coords);
      setShow(true);
    }
  };

  const handleMouseLeave = () => {
    setShow(false);
  };

  useEffect(() => {
    handleMouseLeave();
  }, [children]);

  return (
    <>
      { tip && (
      <C.TooltipParent
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </C.TooltipParent>
      ) }
      { show === true && tip
            && createPortal(
              <C.TooltipWrapper position={position} style={coordinates}>
                {tip}
              </C.TooltipWrapper>,
              tooltipRoot,
            )}
    </>
  );
};
Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;
Tooltip.displayName = '@asurgent.ui.Tooltip';

export default Tooltip;
