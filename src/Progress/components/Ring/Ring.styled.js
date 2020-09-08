import styled, { keyframes } from 'styled-components';

const blinkAnim = () => keyframes`
    0% {
      opacity: 1;
  }
  40% {
      opacity: 1;
  }
  60% {
      opacity: 0;
  }
  75% {
  opacity: 1;
  }
  100% {
      opacity: 1;
  }
`;

export const Container = styled.div`
  position: relative;
  width: fit-content;
`;

export const Small = styled.span``;

export const Text = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0;
  transform: translate(-50%, -50%);
  line-height: ${({ radius }) => `${radius * 2}px`};
  font-size: ${({ radius }) => `${radius * 0.5}px`};
  ${Small} {
    font-size: ${({ radius }) => `${radius * 0.3}px`};
  }
`;

export const Ring = styled.circle`
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: ${({ radius }) => `${radius}px ${radius}px`};

  opacity: 1;
  animation-duration: 3s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-name: ${({ useAnimation }) => (useAnimation ? blinkAnim : '')};
`;
