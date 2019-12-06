import styled from 'styled-components';

export const TooltipWrapper = styled.div`
  top: 0;
  left: 0;
  z-index: 999;
  position: fixed;
  background-color: #161616;
  padding: .8rem;
  border-radius: 3px;
  transform: translateX(-50%);
  color: #ffffff;
  display: none;

  @media screen and (min-width: ${(prop) => `${prop.theme.breakPointTablet * 10}px`}) {
    display: block;
  }
`;
