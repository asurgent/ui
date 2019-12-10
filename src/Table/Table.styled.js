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
    cursor: pointer;
    width: 2.8rem;
    height: 2.8rem;
    border: 1px solid ${({ theme }) => theme.gray400};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: .4rem;
    color: ${({ theme, activePage }) => (activePage ? theme.black : theme.gray800)};
    background: ${({ theme, activePage }) => (activePage ? theme.white : theme.gray200)};
    border-radius: 2px;
`;

export const Base = styled.div`
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    overflow-x: scroll;
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
`;

export const Content = styled.div`
    display: grid;
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
    grid-template-rows: auto;
    width: fit-content;
    min-width: 100%;

    ${Cell} {
        border-bottom: 0px solid ${({ theme }) => theme.gray600};
        border-width: ${({ striped }) => (striped ? '1px' : '0px')};

        &.even-row {
            background: ${({ zebra, theme }) => (zebra ? theme.blue100 : theme.white)};
        }
    }
`;

export const Header = styled(Cell)`
    align-items: center;
    grid-column: unset;
    border-bottom: 1px solid ${({ theme }) => theme.black};
    flex-direction: row;
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
    border-color: ${({ active, theme }) => (active ? theme.gray800 : theme.gray300)}
`;
