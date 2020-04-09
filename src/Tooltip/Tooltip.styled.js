import styled from 'styled-components';

export default {};

const TooltipWrapper = styled.div`
  top: 0;
  left: 0;
  z-index: 3;
  position: fixed;
  background-color: #161616;
  padding: .8rem;
  border-radius: 3px;
  transform: ${({ middle }) => (middle ? 'translateX(-50%)' : 'translateY(-50%)')};
  
  color: #ffffff;
  display: none;

  @media screen and (min-width: ${(prop) => `${prop.theme.breakPointTablet * 10}px`}) {
    display: block;
  }
`;

export { TooltipWrapper };
