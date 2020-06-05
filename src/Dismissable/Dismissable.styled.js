import styled, { keyframes } from 'styled-components';

const fadeOut = () => keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const Dismiss = styled.div`
  cursor: pointer;
`;

export const Container = styled.div`
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 3.2rem 1.6rem;

  h3 {
    margin: 0;
  }

  &.fadeOut {
    opacity: 0;
    animation-duration: ${({ fadeOutSpeed }) => `${fadeOutSpeed / 1000}s`};
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;
    animation-name: ${fadeOut};
  }
`;

export const ContainerPrimary = styled(Container)`
color: ${({ theme }) => theme.white};
  fill: ${({ theme }) => theme.gold800};
    background: ${({ theme }) => theme.blue900};
    border: 0.1rem solid ${({ theme }) => theme.blue900};
`;

export const ContainerPlain = styled(Container)`
    fill: ${({ theme }) => theme.gray300};
    color: ${({ theme }) => theme.black};
    background: ${({ theme }) => theme.white};
    border: 0.1rem solid ${({ theme }) => theme.gray300};
`;


export const IconHolder = styled.div`
    display: flex;
    align-items: center;
    margin-right: 4.7rem;
    font-size: 2.2rem;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;
