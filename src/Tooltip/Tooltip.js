import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import * as C from './Tooltip.styled';

const modalRoot = document.getElementById('tooltip-root');
const positions = {
  middle: 'middle',
  right: 'right',
};

class Tooltip extends Component {
    state = {
      show: false,
      position: { left: 0, top: 0 },
      ref: createRef(),
    }

    showTooltip = ({ currentTarget }) => {
      if (currentTarget != null) {
        const {
          x, top, height, width,
        } = currentTarget.getBoundingClientRect();
        const position = {};
        const spacing = 5;

        if (this.props.position === positions.middle) {
          Object.assign(position, { left: x + (width / 2), top: top + height + spacing });
        } else if (this.props.position === positions.right) {
          Object.assign(position, { left: x + width + spacing, top: top + (height / 2) });
        }


        this.setState({ show: true, position });
      }
    }

    hideTooltip = () => {
      this.setState({ show: false, position: { left: 0, top: 0 } });
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
          tooltipRef: ref,
        }));
    }

    render() {
      const { tip: tooltipMessage, children } = this.props;
      const { position, show } = this.state;

      const isMiddle = this.props.position === positions.middle;
      const isRight = this.props.position === positions.right;

      return (
        <>
          {tooltipMessage ? this.renderChildren(children) : children}
          { show === true && tooltipMessage
            && ReactDOM.createPortal(
              <C.TooltipWrapper middle={isMiddle} right={isRight} style={position}>{tooltipMessage}</C.TooltipWrapper>,
              modalRoot,
            )}
        </>
      );
    }
}


// Proptypes
Tooltip.propTypes = {
  children: PropTypes.element,
  tip: PropTypes.string,
  position: PropTypes.string,
};

// Proptypes
Tooltip.defaultProps = {
  children: null,
  tip: '',
  position: positions.middle,
};

export default Tooltip;
