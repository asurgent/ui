import styled from 'styled-components';
import * as T from '../Typography';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
`;

export const Label = styled(T.P.Main)`
    user-select: none;
    margin: 0;
    color: ${({ theme, selected }) => (selected ? theme.white : theme.black)};
`;

export const Year = styled.div`
    border-radius: 5px;
    background: ${({ theme, selected }) => (selected ? theme.blue900 : 'transparent')};
    transition: 0.15s;
    padding: 0.5625rem 1.125rem;
    cursor: pointer;
    width: 9.375rem;
`;
