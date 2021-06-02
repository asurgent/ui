import styled from 'styled-components';

export const TooltipWrapper = styled.span`
  top: 0;
  left: 0;
  z-index: 2;
  position: fixed;
  background-color: #161616;
  padding: 0.5rem;
  border-radius: 5px;
  max-width: max(12.5rem, 25vw);
  white-space: pre-wrap;
  font-size: 0.75rem;
  animation: fade-in .1s ease;
  transform: ${({ position }) => {
    switch (position) {
      case 'top':
        return 'translate(-50%, -100%)';
      case 'left':
        return 'translate( -100%, -50%)';
      case 'right':
        return 'translateY(-50%)';
      default:
        return 'translateX(-50%)';
    }
  }};

  color: ${({ theme }) => theme.white};
  display: none;


  @media screen and (min-width: ${(prop) => `${prop.theme.breakPointTablet * 10}px`}) {
    display: block;
  }


  @keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
`;

export const TooltipCard = styled(TooltipWrapper)`
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.black};
  padding: 1rem;
  filter: ${({ theme }) => `drop-shadow(0 1px 6px ${theme.rgba(theme.black, 0.2)})`};
  @media screen and (min-width: ${(prop) => `${prop.theme.breakPointTablet * 10}px`}) {
    display: flex;
    flex-direction: column;
  }
  max-width: min(28.0.9375rem, 80vw);
 
  &:after {
        width: 0;
        height: 0;
        content: '';
        bottom: -1.875rem;
        position: absolute;
        pointer-events: none;

        border-style: solid;
        border-width: 0.9375rem;
        border-color: transparent;

  }
  &.left:after {
      border-left-color: ${({ theme }) => theme.white};
      left: calc(100%);
      top: calc(50% - 0.9375rem);
    }
    &.right:after {
        border-right-color: ${({ theme }) => theme.white};
        left: calc(0% - 1.875rem);
        top: calc(50% - 0.9375rem);
    }
    &.top:after {
      border-top-color:${({ theme }) => theme.white};
      top: calc(100%);
      left: calc(50% - 0.9375rem);
    }
    &.middle:after {
      border-bottom-color: ${({ theme }) => theme.white};
      left: calc(50% - 0.9375rem);
      top: calc(0% - 1.875rem); 
    }
`;

export const TooltipParent = styled.span`
  background: transparent!important;
`;

export const Header = styled.div``;

export const Content = styled.div`
  margin-top: 00.5rem;
  margin-bottom: 00.5rem; 
`;

export const Separator = styled.div`
    height: 1px;
    margin-left: -1.25rem;
    margin-right: -1.25rem;
    background: ${({ theme }) => theme.gray300};
`;

export const Footer = styled.div`
  & *:nth-child(2) {
    margin-top: 1.25rem;
  }
`;
