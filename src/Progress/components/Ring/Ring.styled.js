import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: fit-content;
  /*   display: flex;
  justify-content: center;
  align-items: center; */

`;

export const Small = styled.span``;

export const Text = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  font-size: ${({ radius }) => `${radius / 3}px`};
  ${Small} {
    font-size: ${({ radius }) => `${radius / 4}px`};
  }
`;

export const Ring = styled.circle`
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: ${({ radius }) => `${radius}px ${radius}px`};
`;
