import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import * as C from './Tooltip.styled';

const modalRoot = document.getElementById('tooltip-root');
const positions = {
  middle: 'middle',
  right: 'right',
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

        if (position === positions.middle) {
          Object.assign(coordinates, { left: x + (width / 2), top: top + height + spacing });
        } else if (position === positions.right) {
          Object.assign(coordinates, { left: x + width + spacing, top: top + (height / 2) });
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

      const isMiddle = position === positions.middle;
      const isRight = position === positions.right;

      return (
        <>
          {tooltipMessage ? this.renderChildren(children) : children}
          { show === true && tooltipMessage
            && ReactDOM.createPortal(
              <C.TooltipWrapper middle={isMiddle} right={isRight} style={coordinates}>{tooltipMessage}</C.TooltipWrapper>,
              modalRoot,
            )}
        </>
      );
    }
}

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;
Tooltip.displayName = '@asurgent.ui.Tooltip';

export default Tooltip;
