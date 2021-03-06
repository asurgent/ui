import styled from 'styled-components';

export const ClickShield = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

export const FadeIn = styled.div`
    width: 100%;
    position: relative;
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

export const FadeOut = styled(FadeIn)``;

export const FadeInAndOut = styled(FadeIn)`
 opacity: ${({ state, in: visible }) => {
    switch (state) {
      case 'entering':
        return visible ? 0 : 1;
      case 'entered':
        return visible ? 0 : 1;
      case 'exiting':
        return visible ? 1 : 0;
      case 'exited':
        return visible ? 1 : 0;
      default:
        return 0;
    }
  }};
`;

export const FadeInSlideDown = styled(FadeIn)`
    transform: ${({ state, noTransform }) => {
    if (noTransform) {
      return 0;
    }
    return `${state === 'entering' || state === 'entered' ? 20 : 0}px`;
  }
};
`;

export const FadeInSlideDownOnDesktop = styled(FadeIn)`
  @media screen and (min-width: ${(prop) => `${prop.theme.breakPointMobile * 10}px`}) {
      transform: translateY(
        ${({ state }) => (state === 'entering' || state === 'entered' ? 20 : 0)}px
      );
  }
`;

export const FadeInFitted = styled(FadeIn)`
  position: absolute!important;
  left: 0;
  right: 0;
  @media screen and (min-width: ${(prop) => `${prop.theme.breakPointMobile * 10}px`}) {
    transform: translateY(
      ${({ state }) => (state === 'entering' || state === 'entered' ? 32 : 0)}px
    );
  }
`;
