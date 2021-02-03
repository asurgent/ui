import React, { createRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import * as C from './Tooltip.styled';
import { positions, getCoordinates } from './helpers';

const tooltipRoot = document.getElementById('tooltip-root');

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  tip: PropTypes.string,
  position: PropTypes.string,
  header: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  footer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

const defaultProps = {
  tip: '',
  position: positions.middle,
  children: null,
  header: null,
  content: null,
  footer: null,
};

const Tooltip = ({
  position, tip, header, content, footer, children,
}) => {
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

  if (header || footer || content) {
    return (
      <>
        <C.TooltipParent
          ref={ref}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </C.TooltipParent>

        { createPortal(
          <C.TooltipCard position={position} style={coordinates}>
            {header && (
            <C.Header>
              {header}
              <C.Separator />
            </C.Header>
            )}

            {content && (
              <C.Content>
                {content}
              </C.Content>
            )}

            {footer && (
            <C.Footer>
              <C.Separator />
              {footer}
            </C.Footer>
            )}
          </C.TooltipCard>,
          tooltipRoot,
        )}
      </>
    );
  }

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
