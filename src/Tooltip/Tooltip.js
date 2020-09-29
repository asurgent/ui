import React, { createRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import * as C from './Tooltip.styled';

const tooltipRoot = document.getElementById('tooltip-root');
const positions = {
  middle: 'middle',
  right: 'right',
  left: 'left',
};

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
      const {
        x, top, height, width,
      } = ref.current.getBoundingClientRect();

      const spacing = 5;

      if (position === positions.right) {
        setCoordinates({ left: x + width + spacing, top: top + (height / 2) });
      } else if (position === positions.left) {
        setCoordinates({ left: x - spacing, top: top + (height / 2) });
      } else {
        // Middle
        setCoordinates({ left: x + (width / 2), top: top + height + spacing });
      }
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
      <div
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      ) }
      { show === true && tip
            && createPortal(
              <C.TooltipWrapper
                position={position}
                style={coordinates}
              >
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
