import styled from 'styled-components';

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
`;
