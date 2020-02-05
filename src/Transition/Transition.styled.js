import styled from 'styled-components';

export const FadeIn = styled.div`
    /* position: relative;
    height: 100vh;
    width: 100vw;
    position: absolute; */
    transition: ${({ timeout }) => `${parseInt(timeout, 10) / 1000}s`};
    opacity: ${({ state }) => {
    switch (state) {
      case 'entering':
        return 1;
      case 'entered':
        return 1;
      case 'exiting':
        return 0;
      case 'exited':
        return 0;
      default:
        return 0;
    }
  }};
`;

export const FadeInSlideDown = styled(FadeIn)`
    transform: translateY(
    ${({ state }) => (state === 'entering' || state === 'entered' ? 10 : 0)}px
    );
`;
