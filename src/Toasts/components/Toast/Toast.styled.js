import styled from 'styled-components';

export const Message = styled.div`
    word-break: break-word;  
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
`;

export const Toast = styled.div`
    position: relative;
    display: grid;
    width: 36rem;
    justify-content: center;
    align-items: center;
    grid-template-columns: 2rem 1fr 2rem;
    grid-column-gap: .8rem;
    grid-template-areas: "icon text close";
    padding: 1.6rem;
    border-radius: 5px;
    box-shadow: 0px 8px 24px rgba(149, 157, 165, 0.2);
    background-color: ${({ theme }) => theme.black};
    color: ${({ theme }) => theme.white};
    margin-bottom: .8rem;

    p {
      margin: .8rem;
    }

    .icon {
      fill: ${({ theme }) => theme.white};
      border-radius: 100%;
      padding: 3px;
    }

    .close {
        fill: ${({ theme }) => theme.white};
        align-self: flex-start;
        margin-top: .8rem;
        right: .4rem;
        height: 2rem;
        width: 2rem;
        cursor: pointer;
    }
`;

export const Bar = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    height: .4rem;
    width: ${({ done }) => `${100 - done}%`};
    transition: width 100ms;
    border-top-right-radius: 5px;
    border-top-left-radius: ${({ done }) => (done > 2 ? '0px' : '5px')};
`;
