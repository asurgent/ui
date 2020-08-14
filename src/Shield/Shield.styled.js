import styled from 'styled-components';

export default {};

export const Overlay = styled.div`
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
    position: fixed;
    background: ${({ theme, backgroundColor, dark }) => {
    if (typeof backgroundColor === 'function') {
      return backgroundColor(theme);
    } if (typeof backgroundColor === 'string') {
      return backgroundColor;
    } if (dark) {
      return theme.rgba(theme.black, 0.2);
    }

    return 'transparent';
  }};
`;
