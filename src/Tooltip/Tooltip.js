import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import * as C from './Tooltip.styled';

const modalRoot = document.getElementById('tooltip-root');


class Tooltip extends Component {
    state = {
      show: false, top: 0, left: 0, ref: createRef(),
    }

    showTooltip = ({ currentTarget }) => {
      if (currentTarget != null) {
        const {
          x, top, height, width,
        } = currentTarget.getBoundingClientRect();
        const left = x + (width / 2);

        this.setState({ show: true, left, top: top + height + 5 });
      }
    }

    hideTooltip = () => {
      this.setState({ show: false, left: 0, top: 0 });
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
      const { top, left, show } = this.state;

      return (
        <>
          {tooltipMessage ? this.renderChildren(children) : children}
          { show === true && tooltipMessage
            && ReactDOM.createPortal(
              <C.TooltipWrapper style={{ top, left }}>{tooltipMessage}</C.TooltipWrapper>,
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
};

// Proptypes
Tooltip.defaultProps = {
  children: null,
  tip: '',
};

export default Tooltip;
