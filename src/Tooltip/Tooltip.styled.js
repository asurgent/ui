import styled from 'styled-components';

export const TooltipWrapper = styled.span`
  top: 0;
  left: 0;
  z-index: 3;
  position: fixed;
  background-color: #161616;
  padding: .8rem;
  border-radius: 5px;
  max-width: max(20rem, 25vw);
  white-space: pre-wrap;
  font-size: 1.2rem;
  animation: fade-in .1s ease;
  transform: ${({ position }) => {
    switch (position) {
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
  padding: 2.4rem 2rem;
  filter: ${({ theme }) => `drop-shadow(0 1px 6px ${theme.rgba(theme.black, 0.2)})`};
  @media screen and (min-width: ${(prop) => `${prop.theme.breakPointTablet * 10}px`}) {
    display: flex;
    flex-direction: column;
  }
`;

export const TooltipParent = styled.span`
  background: transparent!important;
`;

export const Header = styled.div`
  &:after {
    content: '';
    left: 0;
    right: 0;
    height: 1px;
    position: absolute;
    background: ${({ theme }) => theme.gray300};
  }
`;

export const Content = styled.div`

`;

export const Footer = styled.div`
  &:before {
    content: '';
    left: 0;
    right: 0;
    height: 1px;
    position: absolute;
    background: ${({ theme }) => theme.gray300};
  }
`;
