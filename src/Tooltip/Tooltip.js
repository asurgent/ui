import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import * as C from './Tooltip.styled';

const tooltipRoot = document.getElementById('tooltip-root');
const positions = {
  middle: 'middle',
  right: 'right',
  left: 'left',
};

const propTypes = {
  children: PropTypes.element,
  tip: PropTypes.string,
  position: PropTypes.string,
};

const defaultProps = {
  tip: '',
  position: positions.middle,
  children: null,
};

class Tooltip extends Component {
    state = {
      show: false,
      coordinates: { left: 0, top: 0 },
      ref: createRef(),
    }

    showTooltip = ({ currentTarget }) => {
      if (currentTarget != null) {
        const {
          x,
          top,
          height,
          width,
        } = currentTarget.getBoundingClientRect();
        const { position } = this.props;
        const coordinates = {};
        const spacing = 5;

        if (position === positions.right) {
          Object.assign(coordinates, { left: x + width + spacing, top: top + (height / 2) });
        } else if (position === positions.left) {
          Object.assign(coordinates, { left: x - spacing, top: top + (height / 2) });
        } else {
          // Middle
          Object.assign(coordinates, { left: x + (width / 2), top: top + height + spacing });
        }

        this.setState({ show: true, coordinates });
      }
    }

    hideTooltip = () => {
      this.setState({ show: false, coordinates: { left: 0, top: 0 } });
    }

    renderChildren = (children) => {
      const { ref } = this.state;

      if (ref.current) {
        ref.current.addEventListener('mouseenter', this.showTooltip);
        ref.current.addEventListener('mouseleave', this.hideTooltip);
      }

      return React.Children.map(children,
        (child) => React.cloneElement(child, {
          onMouseEnter: this.showTooltip,
          onMouseLeave: this.hideTooltip,
          ref,
        }));
    }

    render() {
      const { tip: tooltipMessage, children, position } = this.props;
      const { coordinates, show } = this.state;

      return (
        <>
          {tooltipMessage ? this.renderChildren(children) : children}
          { show === true && tooltipMessage
            && ReactDOM.createPortal(
              <C.TooltipWrapper
                position={position}
                style={coordinates}
              >
                {tooltipMessage}
              </C.TooltipWrapper>,
              tooltipRoot,
            )}
        </>
      );
    }
}

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;
Tooltip.displayName = '@asurgent.ui.Tooltip';

export default Tooltip;
