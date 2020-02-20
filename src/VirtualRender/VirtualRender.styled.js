import styled from 'styled-components';

export const Wrapper = styled.div`
    width: auto;
    height: initial;
    overflow-y: scroll;
`;

export const ScrollContainer = styled.div`
    width: auto;
    height: ${({ count, rowHeight }) => `${count * rowHeight}px`};
    position: relative;
`;

export const ItemsContainer = styled.div`
    width: 100%;
    height: auto;
    position: absolute;

    > * {
        margin: 0;
        box-sizing: border-box;
        min-height: ${({ rowHeight }) => `${rowHeight}px`};
        height: ${({ rowHeight }) => `${rowHeight}px`};
    }
`;
