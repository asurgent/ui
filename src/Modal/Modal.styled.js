import styled from 'styled-components';

export const Modal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  background: ${({ theme, transparent }) => (transparent ? 'transparent' : theme.white)};
  display: flex;
  flex-direction: column;
  padding: 1rem;
  
  @media screen and (min-width: ${(prop) => `${prop.theme.breakPointDesktop * 10}px`}) {
    padding: 1.25rem 0;
    border-radius: 5px;
    position: relative;
    width: ${({ fullscreen }) => (fullscreen ? '100vw' : '50%')};
    height: ${({ fullscreen }) => (fullscreen ? '100vw' : 'auto')};
    min-width: ${({ fullscreen }) => (fullscreen ? '100vw' : '200px')};
    max-height: ${({ fullscreen }) => (fullscreen ? '100vh' : '80vh')};
  }
`;

export const ModalTitle = styled.h2`
  width: auto;
  max-width: 100%;
  overflow: hidden;
  height: 3.25rem;
  font-size: 1.75rem;
  line-height: 1.75rem;
  margin: 0 1.25rem;
  margin-bottom: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-top: 1.25rem;
  justify-content: center;
  margin-bottom: ${({ withActionbar }) => (withActionbar ? '3.5rem' : '0')};

  @media screen and (min-width: ${(prop) => `${prop.theme.breakPointDesktop * 10}px`}) {
    padding: 0 1.25rem;
  }
`;

export const Close = styled.div`
    width: 40px;
    height: 40px;
    padding: .4em;
    position: absolute;
    display: flex;
    right: 0.25rem;
    top: 0.25rem;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    i {
        font-size: 1.25rem;
    }
`;

export const Actionbar = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 1.25rem;
    width: 100%;
`;

export const Overlay = styled.div`
  top: 0;
  left: 0;
  z-index: 2;
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
