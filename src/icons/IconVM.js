import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  fill: PropTypes.string,
};

const defaultProps = {
  height: '16px',
  width: '14px',
  fill: 'black',
};

const IconVM = (props) => {
  const { height, width, fill } = props;
  return (
    <svg
      viewBox="0 0 14 16"
      fill="none"
      height={height}
      width={width}
      version={1}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.6 2.4H10.2C10.2 1.072 8.76798 0 6.99998 0C5.23198 0 3.79998 1.072 3.79998 2.4H1.39998C0.959976 2.4 0.599976 2.76 0.599976 3.2C0.599976 3.64 0.959976 4 1.39998 4V9.6C1.39998 10.0243 1.56855 10.4313 1.8686 10.7314C2.16866 11.0314 2.57563 11.2 2.99998 11.2H11C11.888 11.2 12.6 10.488 12.6 9.6V4C13.04 4 13.4 3.64 13.4 3.2C13.4 2.76 13.04 2.4 12.6 2.4ZM11 9.6H2.99998V4H11V9.6ZM10.088 4.8C10.152 5.056 10.2 5.32 10.2 5.6C10.2 7.368 8.76798 8.8 6.99998 8.8C5.23198 8.8 3.79998 7.368 3.79998 5.6C3.79998 5.32 3.84798 5.056 3.91198 4.8H5.62398C5.48798 5.04 5.39998 5.304 5.39998 5.6C5.39998 6.48 6.11998 7.2 6.99998 7.2C7.87998 7.2 8.59998 6.48 8.59998 5.6C8.59998 5.304 8.51198 5.04 8.37598 4.8H10.088ZM13.4 13.6V16H0.599976V13.6C0.599976 12.976 0.975975 12.44 1.54398 12H6.99998C4.82398 12 2.35198 13.032 2.19998 13.6V14.4H11.8V13.6C11.648 13.032 9.17598 12 6.99998 12H12.456C13.024 12.44 13.4 12.976 13.4 13.6Z"
        fill={fill}
      />
    </svg>
  );
};
IconVM.propTypes = propTypes;
IconVM.defaultProps = defaultProps;
export default IconVM;
