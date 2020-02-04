import styled from 'styled-components';

export const Overlay = styled.div`
    top: 0;
    left: 0;
    z-index: 999;
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

    overflow: hidden;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;

    &+ * {
        z-index: 1000;
    }
`;
