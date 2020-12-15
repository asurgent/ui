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
  padding: 1.6rem;
  
  @media screen and (min-width: ${(prop) => `${prop.theme.breakPointDesktop * 10}px`}) {
    padding: 3.2rem 0;
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
  height: 5.2rem;
  font-size: 2.8rem;
  line-height: 2.8rem;
  margin: 0 3.2rem;
  margin-bottom: 1.6rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-top: 3.2rem;
  justify-content: center;
  margin-bottom: ${({ withActionbar }) => (withActionbar ? '5.6rem' : '0')};

  @media screen and (min-width: ${(prop) => `${prop.theme.breakPointDesktop * 10}px`}) {
    padding: 0 3.2rem;
  }
`;

export const Close = styled.div`
    width: 40px;
    height: 40px;
    padding: .4em;
    position: absolute;
    display: flex;
    right: .4rem;
    top: .4rem;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    i {
        font-size: 2rem;
    }
`;

export const Actionbar = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 3.2rem;
    width: 100%;
`;

export const Overlay = styled.div`
  top: 0;
  left: 0;
  z-index: 3;
  position: fixed;
  background: rgba(0, 0, 0, 0.3);

  overflow: hidden;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
