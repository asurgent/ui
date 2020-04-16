import styled, { keyframes } from 'styled-components';

const animAfter = ({ color, size }) => keyframes`
    0%,
    50% {
        border: 0px solid ${color};
        opacity: 0.1;
    }
    100% {
        border: ${size / 10}px solid ${color};
        opacity: 1;
    }
`;

const animBefore = ({ color, size }) => keyframes`
    0% {
        border: ${size / 10}px solid ${color};
        opacity: 1;
    }
    50%,
    100% {
        border: 0px solid ${color};
        opacity: 0.1;
    }
`;

const Wrapper = styled.div`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
`;

const Ring = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  height: 100%;
  &:after,
  &:before {
    width: 100%;
    height: 100%;
    content: "";
    position: absolute;
    border-radius: 50%;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    box-sizing: border-box;
    border: ${({ size, color }) => `${size / 10}px solid ${color}`};
  }
  &:before {
    border: ${({ size, color }) => `${size / 10}px solid ${color}`};
    animation-name: ${animBefore};
  }
  &:after {
    border: ${({ color }) => `0px solid ${color}`};
    animation-name: ${animAfter};
  }
`;

export { Wrapper, Ring };
