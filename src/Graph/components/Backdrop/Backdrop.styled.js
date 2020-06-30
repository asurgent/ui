import styled from 'styled-components';

export const Backdrop = styled.rect`
    height: ${({ dimensions }) => `${dimensions.boundedHeight}px`};
    width: ${({ dimensions }) => `${dimensions.boundedWidth}px`};
    fill: transparent;
`;
