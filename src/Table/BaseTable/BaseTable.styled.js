import styled from 'styled-components';

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

/* Content styling */

export const Count = styled.div`
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    display: flex;
    color: ${({ theme }) => theme.gray600};
    font-weight: 400;
    font-size: 1rem;
    align-items: center;
    justify-content: flex-end;
    flex-direction: row;
    padding: .8rem 0;
`;

export const Wrapper = styled.div`
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    display: flex;
    flex-direction: column;
`;

export const Base = styled.div`
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    overflow-x: auto;
`;

export const Content = styled.div`
    display: grid;
    width: fit-content;
    min-width: 100%;
    grid-template-rows: auto;
    grid-template-columns: 1fr;
`;

/* Row & cell styling */

export const Row = styled.div`
  display: grid;
  width: fit-content;
  min-width: 100%;
  grid-template-columns: ${({ headerList, equalSize }) => {
    const columnSize = 'minmax(50px, 1fr)';
    const sizing = headerList
      .reduce((acc, { size, render = true }) => {
        if (!render) {
          return acc;
        }

        if (equalSize) {
          acc.push(columnSize);
        } else {
          acc.push(size || columnSize);
        }
        return acc;
      }, []).join(' ').trim();

    return sizing;
  }};

  border-bottom: 0px solid ${({ theme }) => theme.gray200};
  border-width: ${({ striped }) => (striped ? '1px' : '0px')};
  border-left: none;
  border-right: none;
  background: ${({ theme }) => theme.white};

  &:nth-child(even) {
    background: ${({ zebra, theme }) => (zebra ? theme.blue50 : theme.white)};
  }
`;

export const Cell = styled.div`
    display: flex;
    padding: .8rem;
    position: relative;
    overflow: hidden;
    min-height: 5.6rem;
    align-items: center;
`;

export const TableCellContent = styled.div`
    margin: 0;
    padding: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

/* Loader & empty state wrapper */
export const Loading = styled.div`
    grid-column: 1/-1;
    padding: 1.6rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;
