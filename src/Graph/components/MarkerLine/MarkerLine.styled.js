import styled from 'styled-components';

export const DashedLine = styled.line`
    fill: none;
    stroke: ${({ theme }) => theme.ruby800};
    stroke-dasharray: 5 3;
    stroke-width: 1px;
`;
