import styled from 'styled-components';

export const TooltipWrapper = styled.div`
  top: 0;
  left: 0;
  z-index: 3;
  position: fixed;
  background-color: #161616;
  padding: .8rem;
  border-radius: 3px;
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
  
  color: #ffffff;
  display: none;

  @media screen and (min-width: ${(prop) => `${prop.theme.breakPointTablet * 10}px`}) {
    display: block;
  }
`;
