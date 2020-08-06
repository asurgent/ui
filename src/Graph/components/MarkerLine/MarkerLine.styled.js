import styled from 'styled-components';

export const MarkerLine = styled.line`
    fill: none;
    stroke: ${({ theme, color }) => (color || theme.ruby800)};
    stroke-dasharray: 5 3;
    stroke-width: 1px;
`;
