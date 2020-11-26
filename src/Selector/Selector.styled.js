import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
`;

export const Year = styled.div`
    border-radius: 5px;
    background: ${({ theme, selected }) => (selected ? theme.blue900 : 'transparent')};
    color: ${({ theme, selected }) => (selected ? theme.white : theme.black)};
    transition: 0.15s;
    padding: 0.9rem 1.8rem;
    cursor: pointer;
    width: 15rem;

    p {
        user-select: none;
        margin: 0;
    };
`;
