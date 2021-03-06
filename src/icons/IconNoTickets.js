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

const NoTicketsImage = (props) => {
  const { height, width } = props;
  return (
    <svg
      viewBox="0 0 2000 2000"
      height={height}
      width={width}
      version={1}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="#fff" d="M0 0H2000V2000H0z" data-name="Layer 2" />
      <circle cx="982.06" cy="1035.22" r="696.67" fill="#f9f3e6" />
      <circle cx="982.06" cy="1035.22" r="589.44" fill="#efe0bd" />
      <circle cx="982.06" cy="1035.22" r="485.55" fill="#e1c687" />
      <path
        fill="#cd9f35"
        d="M691.2 469.17a9 9 0 019 9v58.15a9 9 0 01-9 9 9 9 0 01-9-9v-58.14a9 9 0 019-9.01z"
      />
      <path
        fill="#cd9f35"
        d="M653.12 507.25a9 9 0 019-9h58.15a9 9 0 019 9 9 9 0 01-9 9h-58.14a9 9 0 01-9.01-9z"
      />
      <path
        fill="#fff"
        d="M646.66 949.17a5.57 5.57 0 015.57 5.57v36a5.57 5.57 0 01-5.57 5.57 5.57 5.57 0 01-5.57-5.57v-36a5.57 5.57 0 015.57-5.57z"
      />
      <path
        fill="#fff"
        d="M623.12 972.72a5.57 5.57 0 015.57-5.57h35.95a5.57 5.57 0 015.57 5.57 5.57 5.57 0 01-5.57 5.57h-35.95a5.57 5.57 0 01-5.57-5.57zM641.09 684.91a5.57 5.57 0 015.57 5.57v35.95a5.57 5.57 0 01-5.57 5.57 5.57 5.57 0 01-5.57-5.57v-35.95a5.57 5.57 0 015.57-5.57z"
      />
      <path
        fill="#fff"
        d="M617.55 708.46a5.57 5.57 0 015.57-5.57h36a5.57 5.57 0 015.57 5.57 5.57 5.57 0 01-5.57 5.57h-36a5.57 5.57 0 01-5.57-5.57z"
      />
      <path
        fill="#cd9f35"
        d="M1384.08 407.7a9 9 0 019 9v58.15a9 9 0 01-9 9 9 9 0 01-9-9v-58.14a9 9 0 019-9.01z"
      />
      <path
        fill="#cd9f35"
        d="M1346 445.79a9 9 0 019-9h58.15a9 9 0 019 9 9 9 0 01-9 9H1355a9 9 0 01-9-9z"
      />
      <path
        fill="#fff"
        d="M476.36 1135.87a9 9 0 019 9V1203a9 9 0 01-9 9 9 9 0 01-9-9v-58.15a9 9 0 019-8.98z"
      />
      <path
        fill="#fff"
        d="M438.27 1174a9 9 0 019-9h58.15a9 9 0 019 9 9 9 0 01-9 9h-58.14a9 9 0 01-9.01-9z"
      />
      <path
        fill="#e8d3a2"
        d="M1853.84 898.55a9 9 0 019 9v58.15a9 9 0 01-9 9 9 9 0 01-9-9v-58.14a9 9 0 019-9.01z"
      />
      <path
        fill="#e8d3a2"
        d="M1815.76 936.63a9 9 0 019-9h58.15a9 9 0 019 9 9 9 0 01-9 9h-58.15a9 9 0 01-9-9z"
      />
      <path
        fill="#cd9f35"
        d="M1505.69 1167.22a9 9 0 019 9v58.15a9 9 0 01-9 9 9 9 0 01-9-9v-58.15a9 9 0 019-9z"
      />
      <path
        fill="#cd9f35"
        d="M1467.61 1205.3a9 9 0 019-9h58.15a9 9 0 019 9 9 9 0 01-9 9h-58.15a9 9 0 01-9-9z"
      />
      <circle cx="1549.11" cy="1242.24" r="10.79" fill="#cd9f35" />
      <path
        fill="#cd9f35"
        d="M252.29 980.34a9 9 0 019 9v58.15a9 9 0 01-9 9 9 9 0 01-9-9v-58.14a9 9 0 019-9.01z"
      />
      <path
        fill="#cd9f35"
        d="M214.21 1018.42a9 9 0 019-9h58.15a9 9 0 019 9 9 9 0 01-9 9h-58.14a9 9 0 01-9.01-9z"
      />
      <circle cx="295.71" cy="1055.36" r="10.79" fill="#cd9f35" />
      <path
        fill="#cd9f35"
        d="M1533.81 743.88a5 5 0 015 5v32.58a5 5 0 01-5 5 5 5 0 01-5-5v-32.53a5 5 0 015-5.05z"
      />
      <path
        fill="#cd9f35"
        d="M1512.46 765.21a5 5 0 015-5.05h32.58a5 5 0 015.05 5.05 5 5 0 01-5.05 5h-32.58a5 5 0 01-5-5z"
      />
      <circle cx="1558.13" cy="785.92" r="6.05" fill="#cd9f35" />
      <path
        fill="#fff"
        d="M1238.23 649.77a5.16 5.16 0 015.17 5.17v33.34a5.16 5.16 0 01-5.17 5.17 5.16 5.16 0 01-5.17-5.17v-33.34a5.16 5.16 0 015.17-5.17z"
      />
      <path
        fill="#fff"
        d="M1216.38 671.61a5.16 5.16 0 015.17-5.16h33.34a5.16 5.16 0 015.17 5.16 5.16 5.16 0 01-5.17 5.17h-33.34a5.16 5.16 0 01-5.17-5.17z"
      />
      <circle cx="1263.13" cy="692.8" r="6.19" fill="#fff" />
      <rect
        width="473.6"
        height="368.55"
        x="587.55"
        y="957.62"
        fill="#cd9f35"
        stroke="#000"
        strokeMiterlimit="10"
        strokeWidth="19.84"
        rx="50"
      />
      <rect
        width="473.6"
        height="368.55"
        x="894.35"
        y="734.89"
        fill="#cd9f35"
        stroke="#000"
        strokeMiterlimit="10"
        strokeWidth="19.84"
        rx="50"
      />
      <circle
        cx="849.34"
        cy="1540.26"
        r="40.81"
        fill="none"
        stroke="#cd9f35"
        strokeMiterlimit="10"
        strokeWidth="19.84"
      />
      <circle
        cx="1197.41"
        cy="1366.99"
        r="40.81"
        fill="none"
        stroke="#f9f3e6"
        strokeMiterlimit="10"
        strokeWidth="14.17"
      />
      <circle
        cx="1156.6"
        cy="288.23"
        r="40.81"
        fill="none"
        stroke="#cd9f35"
        strokeMiterlimit="10"
        strokeWidth="19.84"
      />
      <circle
        cx="883.27"
        cy="538.59"
        r="29.74"
        fill="none"
        stroke="#cd9f35"
        strokeMiterlimit="10"
        strokeWidth="19.84"
      />
      <circle
        cx="392.62"
        cy="655.18"
        r="29.74"
        fill="none"
        stroke="#e8d3a2"
        strokeMiterlimit="10"
        strokeWidth="14.17"
      />
      <circle
        cx="1533.8"
        cy="1679.61"
        r="29.74"
        fill="none"
        stroke="#cd9f35"
        strokeMiterlimit="10"
        strokeWidth="19.84"
      />
      <path d="M1132.46 966.49h1a14.11 14.11 0 0114.11 14.11 14.11 14.11 0 01-14.11 14.11h-1a14.11 14.11 0 01-14.11-14.11 14.11 14.11 0 0114.11-14.11zM1167.13 849.85q-14.6-10.54-36.67-10.55-16.79 0-28.32 7.43-17.72 11.26-19.33 37.82a14.86 14.86 0 00-.1 1.63 14.11 14.11 0 0014.11 14.11h.11c7.78-.06 13.91-6.66 14-14.44a29 29 0 014.73-15.3q4.72-7.51 16-7.52 11.5 0 15.84 6.11a22.86 22.86 0 014.33 13.52 19.73 19.73 0 01-3.89 11.82 25.11 25.11 0 01-5.65 5.76l-7.11 5.57q-10.52 8.21-13 14.5t-3.18 22.77a13.2 13.2 0 0026.4 0q.11-7.79 1.27-11.49a21 21 0 017.5-10.25l6.91-5.38q10.53-8.19 14.22-13.47 6.33-8.7 6.33-21.39.11-20.7-14.5-31.25zM824.86 1187.08h1a14.11 14.11 0 0114.14 14.11 14.11 14.11 0 01-14.11 14.11h-1a14.11 14.11 0 01-14.11-14.11 14.11 14.11 0 0114.08-14.11zM825.35 1056.56a15.29 15.29 0 00-15.28 15.29v36.48l8.1 67.13h14.55l7.91-67.13v-36.48a15.29 15.29 0 00-15.28-15.29z" />
    </svg>
  );
};
NoTicketsImage.propTypes = propTypes;
NoTicketsImage.defaultProps = defaultProps;
export default NoTicketsImage;
