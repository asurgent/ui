import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// 133A5D
const propTypes = {
  active: PropTypes.bool,
  theme: PropTypes.instanceOf(Object),
};
const defaultProps = {
  active: true,
  theme: {},
};
export const Dots = ({ active, theme }) => {
  const color = active ? theme.blue900 : theme.gray600;
  return (
    <svg width="24" height="4" viewBox="0 0 24 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" fill={color} />
      <circle cx="12" cy="2" r="2" fill={color} />
      <circle cx="22" cy="2" r="2" fill={color} />
    </svg>
  );
};
Dots.propTypes = propTypes;
Dots.defaultProps = defaultProps;

export const Duration = ({ active, theme }) => {
  const color = active ? theme.blue900 : theme.gray600;
  return (
    <svg width="54" height="22" viewBox="0 0 54 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="5" stroke={color} strokeWidth="2" />
      <circle cx="48" cy="6" r="5" stroke={color} strokeWidth="2" />
      <circle cx="48" cy="6" r="2" fill={color} />
      <line x1="11" y1="6" x2="43" y2="6" stroke={color} strokeWidth="2" />
    </svg>
  );
};
Duration.propTypes = propTypes;
Duration.defaultProps = defaultProps;

export const Flag = ({ active, theme }) => {
  const color = active ? theme.blue900 : theme.gray600;
  return (
    <svg width="32" height="8" viewBox="0 0 32 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="4" height="4" fill={color} />
      <rect x="4" y="4" width="4" height="4" fill={color} />
      <rect x="8" width="4" height="4" fill={color} />
      <rect x="12" y="4" width="4" height="4" fill={color} />
      <rect x="16" width="4" height="4" fill={color} />
      <rect x="20" y="4" width="4" height="4" fill={color} />
      <rect x="24" width="4" height="4" fill={color} />
      <rect x="28" y="4" width="4" height="4" fill={color} />
    </svg>
  );
};
Flag.propTypes = propTypes;
Flag.defaultProps = defaultProps;

export const StyledSpinner = styled.svg`
    fill-rule:evenodd;
    clip-rule:evenodd;
    stroke-miterlimit:1.5;
    width: ${({ size }) => `${size}px`};
    height: ${({ size }) => `${size}px`};
    animation: 1s linear infinite;
    animation-name: spin;
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); };
    }
    path {
        fill:none;
        stroke: ${({ theme }) => theme.blue900};
        stroke-width: 1px;
    }
    rect {
        fill: none;
    }
`;

export const Spinner = ({ size, ...props }) => (
  <StyledSpinner
    viewBox="0 0 32 32"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    size={size}
    {...props}
  >
    <rect id="Artboard1" x="0" y="0" width="32" height="32" />
    <g id="Artboard11">
      <g transform="matrix(0.982988,0,0,0.982988,4.14255,4.82627)">
        <path d="M25.791,6.408C26.351,7.956 26.657,9.626 26.657,11.367" />
      </g>
      <g transform="matrix(0.982988,0,0,0.982988,4.14255,4.82627)">
        <path d="M26.657,11.367C26.657,13.154 26.335,14.867 25.746,16.45" />
      </g>
      <g transform="matrix(0.982988,0,0,0.982988,4.14255,4.82627)">
        <path d="M25.746,16.45C25.034,18.364 23.931,20.089 22.535,21.528" />
      </g>
      <g transform="matrix(0.982988,0,0,0.982988,4.14255,4.82627)">
        <path d="M22.535,21.528C21.25,22.852 19.716,23.933 18.009,24.697" />
      </g>
      <g transform="matrix(0.982988,0,0,0.982988,4.14255,4.82627)">
        <path d="M18.009,24.697C16.193,25.509 14.18,25.961 12.063,25.961" />
      </g>
      <g transform="matrix(0.982988,0,0,0.982988,4.14255,4.82627)">
        <path d="M12.063,25.961C9.526,25.961 7.139,25.312 5.06,24.172" />
      </g>
      <g transform="matrix(0.982988,0,0,0.982988,4.14255,4.82627)">
        <path d="M5.06,24.172C3.443,23.285 2.012,22.101 0.84,20.693" />
      </g>
      <g transform="matrix(0.982988,0,0,0.982988,4.14255,4.82627)">
        <path d="M0.84,20.693C-0.122,19.537 -0.909,18.23 -1.48,16.813" />
      </g>
      <g transform="matrix(0.982988,0,0,0.982988,4.14255,4.82627)">
        <path d="M-1.48,16.813C-2.158,15.13 -2.531,13.292 -2.531,11.367" />
      </g>
      <g transform="matrix(0.982988,0,0,0.982988,4.14255,4.82627)">
        <path d="M-2.531,11.367C-2.531,9.169 -2.044,7.084 -1.172,5.213" />
      </g>
      <g transform="matrix(0.982988,0,0,0.982988,4.14255,4.82627)">
        <path d="M-1.172,5.213C-0.513,3.799 0.366,2.508 1.422,1.384" />
      </g>
      <g transform="matrix(0.982988,0,0,0.982988,4.14255,4.82627)">
        <path d="M1.422,1.384C2.686,0.037 4.202,-1.07 5.895,-1.861" />
      </g>
      <g transform="matrix(0.982988,0,0,0.982988,4.14255,4.82627)">
        <path d="M5.895,-1.861C7.769,-2.737 9.859,-3.227 12.063,-3.227" />
      </g>
    </g>
  </StyledSpinner>
);

Spinner.propTypes = { size: PropTypes.number };
Spinner.defaultProps = { size: 32 };
