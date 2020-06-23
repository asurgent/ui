import styled from 'styled-components';

export const Line = styled.path`
    fill: none;
    stroke: steelblue;
    stroke-width: 1px;
`;

export const Threashold = styled.line`
    fill: none;
    stroke: ${({ theme }) => theme.ruby800};
    stroke-dasharray: 5 3;
    stroke-width: 1px;
    
`;
