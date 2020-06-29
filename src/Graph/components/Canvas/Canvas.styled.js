import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 100%;
`;

export const ChartGroup = styled.g`
    transform: translate${({ dimensions }) => `(${dimensions.marginLeft}px, ${dimensions.marginTop}px)`};
`;

export const Backdrop = styled.rect`
    height: ${({ dimensions }) => `${dimensions.boundedHeight}px`};
    width: ${({ dimensions }) => `${dimensions.boundedWidth}px`};
    fill: ${({ theme }) => theme.white};
`;
