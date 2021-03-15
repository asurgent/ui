import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
};

const defaultProps = {
  height: '100%',
  width: '100%',
};

const EmptyStateGenericImage = (props) => {
  const { height, width } = props;
  return (
    <svg width={width} height={height} clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" version="1.1" viewBox="0 0 500 500" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">
      <rect width="500" height="500" fill="none" />
      <path d="m465.44 304.13c9.977 33.541-3.53 55.392-11.829 65.663-20.592 3.788-48.243-9.502-48.243-9.502l-5.595-17.062-94.902-44.328s-49.196-2.568-52.28-31.681c5.33-12.416 18.36-19.423 54.383-23.751 29.973-3.602 35.184-10.435 45.923-7.917 13.364 3.133 52.25 57.626 112.54 68.578z" fill="url(#n)" />
      <clipPath id="a"><path d="m103.47 348.8c8.587 0.1 14.543 9.458 14.543 9.458-2.423 2.188-7.271 5.481-15.858 5.38-8.587-0.1-15.263-3.507-14.9-7.602 0.363-4.094 7.629-7.337 16.215-7.236z" /></clipPath>
      <g clipPath="url(#a)"><use transform="scale(.99267 .98955)" x="87.889" y="352.484" width="30.773px" height="14.843px" xlinkHref="#o" /></g>
      <path d="m92.458 158.51-5.355 197.97 30.852 1.878 127.77-117.23-153.26-82.615z" fill="#d7e3ed" />
      <path d="m201.23 145.02c48.238 27.85 72.694 75.934 54.58 107.31-18.115 31.376-71.985 34.238-120.22 6.387-48.239-27.85-72.695-75.934-54.58-107.31 18.115-31.375 71.985-34.238 120.22-6.387z" fill="#145884" />
      <path d="m264.83 251.7s-3.287-0.913-8.646-2.611l-9.173 9.086c2.922 4.345 6.783 10.255 6.783 10.255l146.05 96.338c7.524-2.353 11.437-10.957 11.035-16.73l-146.04-96.338z" fill="url(#g)" />
      <path d="m201.23 145.02c48.238 27.85 74.387 73.003 58.356 100.77-16.03 27.766-68.208 27.697-116.45-0.153s-74.387-73.003-58.356-100.77c16.03-27.766 68.208-27.697 116.45 0.154z" fill="#03486f" />
      <path d="m197.28 151.86c41.677 24.062 64.268 63.073 50.418 87.061-13.85 23.989-58.93 23.93-100.61-0.132-41.677-24.062-64.268-63.073-50.419-87.062 13.85-23.989 58.931-23.929 100.61 0.133z" fill="url(#f)" />
      <path d="m318.26 319.93c5.379 9.831 12.487 6.811 28.868 8.445 4.306-0.203 12.169 4.094 10.394 8.964-0.823 2.258-9.103 5.95-9.103 5.95s-31.503 0.347-30.159-23.359z" fill="url(#e)" />
      <path d="m346.73 335.98c2.289-0.632 10.951-0.141 11.237 2.107 0.513 4.046-9.932 7.24-13.738 3.789-0.821-0.744 0.211-5.265 2.501-5.896z" fill="url(#d)" />
      <path d="m299.87 310.58c6.438 11.768 14.947 8.153 34.555 10.109 5.154-0.244 14.566 4.9 12.441 10.73-0.985 2.702-10.895 7.121-10.895 7.121s-37.71 0.416-36.101-27.96z" fill="url(#c)" />
      <path d="m333.94 330.29c2.741-0.713 13.109-0.159 13.451 2.378 0.615 4.565-11.888 8.169-16.444 4.275-0.983-0.84 0.252-5.941 2.993-6.653z" fill="url(#b)" />
      <path d="m277.21 299.98c7.676 14.03 17.82 9.72 41.196 12.051 6.145-0.29 17.366 5.842 14.833 12.793-1.174 3.222-12.99 8.49-12.99 8.49s-44.957 0.496-43.039-33.334z" fill="url(#m)" />
      <path d="m317.83 323c3.268-0.891 15.629-0.198 16.036 2.972 0.733 5.705-14.173 10.207-19.605 5.342-1.172-1.049 0.302-7.424 3.569-8.314z" fill="url(#l)" />
      <path d="m255.96 285.02c8.95 16.358 20.778 11.333 48.033 14.051 7.165-0.338 20.248 6.812 17.294 14.916-1.369 3.757-15.145 9.899-15.145 9.899s-52.418 0.578-50.182-38.866z" fill="url(#k)" />
      <path d="m302.54 311.27c3.809-1.109 18.222-0.246 18.697 3.698 0.854 7.1-16.525 12.704-22.859 6.649-1.366-1.306 0.352-9.239 4.162-10.347z" fill="url(#j)" />
      <path d="m340.49 268.78c-25.399 1.817-75.126-8.43-78.871 0.664-1.011 2.454-7.018 10.707-5.314 17.339 4.22 16.422 44.434 11.229 59.729 12.768 16.618 1.671 25.729 22.946 49.924 30.929 20.514 6.768 36.854 3.717 42.763-2.215 7.852-7.882-18.601-90.175-68.231-59.485z" fill="url(#i)" />
      <path d="m283.9 272.26c3.063 4.903 1.585 21.705-3.338 22.874-5.426 1.288-19.789-2.285-23.19-5.492-3.873-3.652-3.576-18.409 2.604-20.304 4.868-1.493 20.931-1.87 23.924 2.922z" fill="url(#h)" />
      <defs>
        <linearGradient id="n" x2="1" gradientTransform="matrix(216.38 0 0 135.46 252.59 302.74)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff9457" offset="0" />
          <stop stopColor="#ffab70" stopOpacity=".73" offset=".48" />
          <stop stopColor="#ffeab2" stopOpacity="0" offset="1" />
        </linearGradient>
        <image id="o" width="31px" height="15px" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAPCAYAAAAceBSiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAn0lEQVQ4jb2UUQ7CMAxD4yhX4QQcixNx2vBBVbKpDYuJ8N/ayS+1u+H2eN7lz3JxERExqIZVbzLPBcGAA2EVm9c3kM2wV12O8Ay0ghSHPRsZoNn+B1THrJ2CkUHfTzFBDrRS7mQyTs4kOEVe1MudpyI9lp1/V88nOTuvsXtuBXfyDrZ7U+eMgNPvldEP9ZuO2GmPGVzdYcYew+cGqdf3Ag0cGcqrHLbUAAAAAElFTkSuQmCC" />
        <linearGradient id="g" x2="1" gradientTransform="matrix(11.036 -16.73 157.43 103.85 326.81 316.6)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#004a77" offset="0" />
          <stop stopColor="#03486f" offset=".47" />
          <stop stopColor="#0078b8" offset="1" />
        </linearGradient>
        <linearGradient id="f" x2="1" gradientTransform="matrix(-272.01 471.13 -76.148 -43.964 419.1 -232.34)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a3d3f6" offset="0" />
          <stop stopColor="#8cc1e7" offset=".58" />
          <stop stopColor="#5b9bc6" offset=".8" />
          <stop stopColor="#2c76a7" offset="1" />
        </linearGradient>
        <linearGradient id="e" x2="1" gradientTransform="matrix(39.464 0 0 22.68 318.21 331.27)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffeab2" stopOpacity="0" offset="0" />
          <stop stopColor="#ffb87d" stopOpacity=".73" offset=".34" />
          <stop stopColor="#ffa66a" offset=".65" />
          <stop stopColor="#ff9457" offset="1" />
        </linearGradient>
        <linearGradient id="d" x2="1" gradientTransform="matrix(14.036 0 0 7.6183 343.94 339.53)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff9457" stopOpacity=".9" offset="0" />
          <stop stopColor="#ffd49b" stopOpacity=".9" offset=".5" />
          <stop stopColor="#ffeab2" stopOpacity=".9" offset="1" />
        </linearGradient>
        <linearGradient id="c" x2="1" gradientTransform="matrix(47.238 0 0 27.148 299.81 324.15)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffeab2" stopOpacity="0" offset="0" />
          <stop stopColor="#ffb87d" stopOpacity=".73" offset=".34" />
          <stop stopColor="#ffa66a" offset=".65" />
          <stop stopColor="#ff9457" offset="1" />
        </linearGradient>
        <linearGradient id="b" x2="1" gradientTransform="matrix(16.801 0 0 8.5965 330.61 334.3)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff9457" stopOpacity=".9" offset="0" />
          <stop stopColor="#ffd49b" stopOpacity=".9" offset=".5" />
          <stop stopColor="#ffeab2" stopOpacity=".9" offset="1" />
        </linearGradient>
        <linearGradient id="m" x2="1" gradientTransform="matrix(56.318 0 0 32.366 277.14 316.16)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffeab2" stopOpacity="0" offset="0" />
          <stop stopColor="#ffb87d" stopOpacity=".73" offset=".34" />
          <stop stopColor="#ffa66a" offset=".65" />
          <stop stopColor="#ff9457" offset="1" />
        </linearGradient>
        <linearGradient id="l" x2="1" gradientTransform="matrix(20.03 0 0 10.742 313.86 328.01)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff9457" stopOpacity=".9" offset="0" />
          <stop stopColor="#ffd49b" stopOpacity=".9" offset=".5" />
          <stop stopColor="#ffeab2" stopOpacity=".9" offset="1" />
        </linearGradient>
        <linearGradient id="k" x2="1" gradientTransform="matrix(81.636 -.64593 .37122 46.917 239.91 304.54)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffeab2" stopOpacity="0" offset="0" />
          <stop stopColor="#ffb87d" stopOpacity=".73" offset=".34" />
          <stop stopColor="#ffa66a" offset=".65" />
          <stop stopColor="#ff9457" offset="1" />
        </linearGradient>
        <linearGradient id="j" x2="1" gradientTransform="matrix(23.354 0 0 13.369 297.91 317.51)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff9457" stopOpacity=".9" offset="0" />
          <stop stopColor="#ffd49b" stopOpacity=".9" offset=".5" />
          <stop stopColor="#ffeab2" stopOpacity=".9" offset="1" />
        </linearGradient>
        <linearGradient id="i" x2="1" gradientTransform="matrix(62.642 -58.454 25.789 27.636 336.62 356.3)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff9457" offset="0" />
          <stop stopColor="#ff975a" offset=".29" />
          <stop stopColor="#ff9e62" offset=".6" />
          <stop stopColor="#ffeab2" stopOpacity="0" offset="1" />
        </linearGradient>
        <linearGradient id="h" x2="1" gradientTransform="matrix(30.67 0 0 27.063 254.82 281.87)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffeab2" stopOpacity=".95" offset="0" />
          <stop stopColor="#ffd49b" stopOpacity=".95" offset=".5" />
          <stop stopColor="#ff9457" stopOpacity=".95" offset="1" />
        </linearGradient>
      </defs>
    </svg>
  );
};
EmptyStateGenericImage.propTypes = propTypes;
EmptyStateGenericImage.defaultProps = defaultProps;
export default EmptyStateGenericImage;
