import styled, { keyframes } from 'styled-components';

const ringAnim = ({ size }) => keyframes`
  0% {
    clip-path: circle(${size / 2}px);
    opacity: 1;
  }
  30% {
    opacity: 0;
  }
  50% {
    clip-path: circle(${size / 2 - (size / 10)}px);
    opacity: 0;
  }
  100% {
    clip-path: circle(${size / 2}px);
    opacity: 1;
  }
`;

const Ring = styled.div`
  box-sizing: border-box;
  height: ${({ size }) => `${size}px`};
  width: ${({ size }) => `${size}px`};
  background: transparent;
  border-radius: 50%;
  border: ${({ size, color }) => `${size / 10}px solid ${color}`} ;
  border-radius: 50%;
  animation-duration: ${({ speed }) => `${speed}s`};
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-name: ${ringAnim};
  clip-path: circle((size / 2) + "px");
`;

export { Ring };
