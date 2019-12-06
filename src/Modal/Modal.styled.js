import styled from 'styled-components';

export const Modal = styled.div`
  width: 50%;
  height: auto;
  min-height: 200px;
  max-height: 80vh;
  padding: 3.2rem 0;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.white};
  display: flex;
  flex-direction: column;
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
  padding: 0 3.2rem;
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


export const Overlay = styled.div`
  top: 0;
  left: 0;
  z-index: 999;
  position: fixed;
  height: -webkit-fill-available-;
  background: rgba(0, 0, 0, 0.3);

  overflow: hidden;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
