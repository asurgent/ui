import styled from 'styled-components';

export const Base = styled.div`
    width: 100%;
    max-width: 100%;
    overflow-x: scroll;
    
`;
export const Content = styled.div`
    display: grid;
    grid-template-columns: minmax(20rem, 1fr) minmax(10rem, 1fr) minmax(10rem, 1fr) minmax(10rem, 1fr);
    grid-template-rows: auto;
    grid-row-gap: 1.6rem;
    width: fit-content;
`;
export const Row = styled.div`
    /* display: grid;
    grid-template-columns: minmax(20rem, 1fr) minmax(10rem, 1fr) minmax(10rem, 1fr) minmax(10rem, 1fr);
    grid-template-rows: auto;
    width: fit-content; */
`;

export const Cell = styled.div`
    grid-column-start: 1;
    grid-column-end: 4;
    display: flex;
    padding: .8rem;
    position: relative;
    overflow: hidden;

    > p {
        margin: 0;
        padding: 0;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const Header = styled(Cell)`
    font-weight: 700;
    grid-column-start: unset;
    grid-column-end: unset;
`;

export const HeaderRow = styled(Row)`
    border-bottom: 1px solid ${({ theme }) => theme.black};
`;
