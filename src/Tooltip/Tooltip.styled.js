import styled from 'styled-components';

export const TooltipWrapper = styled.div`
  top: 0;
  left: 0;
  z-index: 2;
  position: fixed;
  background-color: #161616;
  padding: .8rem;
  border-radius: 3px;
  transform: ${({ middle, right }) => {
    if (middle) {
      return 'translateX(-50%)';
    } if (right) {
      return 'translateY(-50%)';
    }
  }};
  
  color: #ffffff;
  display: none;

  @media screen and (min-width: ${(prop) => `${prop.theme.breakPointTablet * 10}px`}) {
    display: block;
  }
`;
