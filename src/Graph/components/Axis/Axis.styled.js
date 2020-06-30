import styled from 'styled-components';

export const Wrapper = styled.div``;

export const XAxisGroup = styled.g`
    transform: translate${({ dimensions }) => `(0, ${dimensions.boundedHeight}px)`};
`;

export const ChartGroup = styled.g`
    transform: translate${({ dimensions }) => `(${dimensions.marginLeft}px, ${dimensions.marginTop}px)`};
`;

export const Backdrop = styled.rect`
    height: ${({ dimensions }) => `${dimensions.boundedHeight}px`};
    width: ${({ dimensions }) => `${dimensions.boundedWidth}px`};
    fill: orange;
`;

export const Line = styled.path`
    fill: none;
    stroke: steelblue;
    stroke-width: 2px;
`;

export const DashedLine = styled.line`
    fill: none;
    stroke: ${({ theme }) => theme.ruby800};
    stroke-dasharray: 5 3;
    stroke-width: 1px;
`;
