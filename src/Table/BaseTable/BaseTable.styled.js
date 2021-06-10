import styled from 'styled-components';
import { lighten } from 'polished';
import MdiIcon from '@mdi/react';
import * as Button from '../../Button';
import * as T from '../../Typography';

export const Arrow = styled.div`
    border: solid black;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transition-duration: 0.5s;
    height: 0.625rem;
    width: 0.625rem;
    margin: 0 0.5rem;
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
    display: flex;
    font-weight: 400;
    font-size: 0.875rem;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    width: 6.25rem;
    white-space: nowrap;
    color: ${({ theme }) => theme.gray600}; 
    svg {
      margin-left: 0.5rem;
    }
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
  padding: 0 1.5rem;
  grid-column-gap: 0.5rem;
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
    position: relative;
    overflow: hidden;
    min-height: 3.5rem;
    align-items: center;
`;

export const Card = styled.div`
    display: flex;
    position: relative;
    overflow: hidden;
    min-height: 3.5rem;
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
    padding: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const RemoveBtn = styled(Button.Transparent)`
  color: ${({ theme }) => theme.ruby800}; 
  font-size: 0.75rem; 
  padding: 0;
  &:hover {
    color: ${({ theme }) => theme.ruby800}; 
  }
`;

export const AddBtn = styled(Button.Primary)`
  background: ${({ theme }) => theme.green400};
  border: none;
  padding: 0.25rem 1rem;
  font-size: 0.75rem;
  &:hover {
    background: ${({ theme }) => lighten(0.03, theme.green400)};
  }
`;

export const SelectedNumber = styled(T.P.Main)`
  margin: 0; 
  font-size: 0.875rem;
`;

export const ActionMenu = styled.div`
  margin: 1.25rem 0 1.25rem 1.25rem;
  display: grid;
  grid-template-columns: repeat(auto);
  gap: 1.25rem;

  @media screen and (min-width: ${(prop) => `${prop.theme.breakPointTablet * 10}px`}) {
    grid-template-columns: auto auto auto 1fr;
  }
  & > * {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;

export const DownloadBtn = styled(MdiIcon)`
  height: 0.9375rem;
  width: 0.9375rem;
  min-height: 0.9375rem;
  min-width: 0.9375rem;
`;
