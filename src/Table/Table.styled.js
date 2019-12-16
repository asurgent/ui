import styled from 'styled-components';
import { sortDirection } from './index';

export const Arrow = styled.div`
    border: solid black;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transition-duration: 0.5s;
    height: 1rem;
    width: 1rem;
    margin: 0 .8rem;
    cursor: pointer;

    transform: ${({ left }) => {
    if (left) {
      return 'rotate(135deg)';
    }
    return 'rotate(-45deg)';
  }};
`;

export const Wrapper = styled.div`
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    display: flex;
    flex-direction: column;
`;

export const Pagination = styled.div`
    display: flex;
    align-items:center;
    justify-content: flex-end;
    margin-top: 1.6rem;
`;

export const Page = styled.div`
    display: flex;
    cursor: pointer;
    width: 2.4rem;
    height: 2.4rem;
    justify-content: center;
    align-items: center;
    margin-left: .8rem;
    font-size:1.2rem;
    font-weight: 600;
    border: 1px solid;
    border-color: ${({ theme, activePage }) => (activePage ? theme.rgba(theme.blue400, 0.2) : 'transparent')};
    background: ${({ theme, activePage }) => (activePage ? theme.rgba(theme.blue400, 0.1) : theme.white)};
    color: ${({ theme }) => theme.gray800};
    border-radius: 2px;

    &:hover {
      border-color: ${({ theme, clickable }) => (clickable ? theme.rgba(theme.blue400, 0.3) : 'transparent')};
      background: ${({ theme, clickable }) => (clickable ? theme.rgba(theme.blue400, 0.2) : 'transparent')};
    }
`;

export const Base = styled.div`
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    overflow-x: auto;
`;

export const Cell = styled.div`
    grid-column: ${({ cardView }) => (cardView ? '1/-1' : 'unset')};
    display: flex;
    padding: .8rem;
    position: relative;
    overflow: hidden;
`;

export const TableCellContent = styled.div`
    margin: 0;
    padding: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 4.8rem;
    display:flex;
    align-items: center;
`;


export const Header = styled(Cell)`
    align-items: center;
    grid-column: unset;
    flex-direction: row;
    border-color: ${({ theme }) => theme.gray300};
`;

export const HeaderContent = styled(TableCellContent)`
    cursor: pointer;
    font-weight: 700;
    flex: 1;
`;

export const HeaderSort = styled(Arrow)`
    height: .8rem;
    width: .8rem;
    margin: 0;
    transform: ${({ direction }) => {
    if (direction === sortDirection.asc) {
      return 'rotate(-135deg)';
    }
    return 'rotate(45deg)';
  }};
    border-color: ${({ active, theme }) => (active ? theme.gray800 : theme.gray300)};
`;

export const Loading = styled.div`
    grid-column: 1/-1;
    padding: 1.6rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Content = styled.div`
    display: grid;
    width: fit-content;
    min-width: 100%;
    grid-template-rows: auto;
    grid-template-columns: ${({ headerList, equalSize }) => {
    const columnSize = 'minmax(50px, 1fr)';
    const sizing = headerList
      .reduce((acc, { size }) => {
        if (equalSize) {
          acc.push(columnSize);
        } else {
          acc.push(size || columnSize);
        }
        return acc;
      }, []).join(' ').trim();

    return sizing;
  }};

    ${Cell} {
        border-bottom: 0px solid ${({ theme }) => theme.gray200};
        border-width: ${({ striped }) => (striped ? '1px' : '0px')};

        &.even-row {
            background: ${({ zebra, theme }) => (zebra ? theme.blue50 : theme.white)};
        }
    }

    ${Header} {
      border-width: 1px;
    }
`;
