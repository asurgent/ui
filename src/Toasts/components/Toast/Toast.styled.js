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
    width: 22.5rem;
    justify-content: center;
    align-items: center;
    grid-template-columns: 1.25rem 1fr 1.25rem;
    grid-column-gap: 0.5rem;
    grid-template-areas: "icon text close";
    padding: 1rem;
    border-radius: 5px;
    box-shadow: 0px 8px 24px rgba(149, 157, 165, 0.2);
    background-color: ${({ theme }) => theme.black};
    color: ${({ theme }) => theme.white};
    margin-bottom: 0.5rem;

    p {
      margin: 0.5rem;
    }

    .icon {
      fill: ${({ theme }) => theme.white};
      border-radius: 100%;
      padding: 3px;
    }

    .close {
        fill: ${({ theme }) => theme.white};
        align-self: flex-start;
        margin-top: 0.5rem;
        right: 0.25rem;
        height: 1.25rem;
        width: 1.25rem;
        cursor: pointer;
    }
`;

export const Bar = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    height: 0.25rem;
    width: ${({ done }) => `${100 - done}%`};
    transition: width 100ms;
    border-top-right-radius: 5px;
    border-top-left-radius: ${({ done }) => (done > 2 ? '0px' : '5px')};
`;
