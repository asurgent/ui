import styled from 'styled-components';

export const HiddenInput = styled.input`
    display: none;
`;

export const Entry = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: ${({ theme }) => `1px solid ${theme.gray200}`};
    align-items: center;
    padding-right: 1.2rem;
`;

export const Container = styled.div`
    width: 100%;
    ${Entry}:last-child {
        border-bottom: none;
    }
`;
