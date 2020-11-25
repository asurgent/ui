import styled from 'styled-components';

export const Year = styled.div`
    border-radius: 5px;
    background: ${({ theme, selected }) => (selected ? theme.blue900 : 'transparent')};
    color: ${({ theme, selected }) => (selected ? theme.white : theme.black)};
    padding: 0.9rem 1.8rem;
    cursor: pointer;
    min-width: 15rem;
    p {
        margin: 0;
    };
`;
