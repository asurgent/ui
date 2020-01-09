import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  fallback: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

const defaultProps = {
  fallback: '',
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch() {
    // You can also log the error to an error reporting service
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // You can render any custom fallback UI
      return fallback;
    }

    return children;
  }
}

ErrorBoundary.propTypes = propTypes;
ErrorBoundary.defaultProps = defaultProps;

export default ErrorBoundary;
