import styled from 'styled-components';
import { lighten } from 'polished';
import MdiIcon from '@mdi/react';
import { Plain } from '../../Button/Button.styled';
import * as Button from '../../Button';
import * as T from '../../Typography';

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
    display: flex;
    font-weight: 400;
    font-size: 1.4rem;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    
    ${Plain} {
      width: 10rem;
      font-size: 1.4rem;
      white-space: nowrap;
    
      .label {
        display: flex;
        align-content: center;
        color: ${({ theme }) => theme.gray600};
      
        svg {
          margin-left: .8rem;
        }
      }
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
  padding: 0 2.4rem;
  grid-column-gap: 0.8rem;
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
    min-height: 5.6rem;
    align-items: center;
`;

export const Card = styled.div`
    display: flex;
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

export const RemoveBtn = styled(Button.Transparent)`
  color: ${({ theme }) => theme.ruby800}; 
  font-size: 1.2rem; 
  padding: 0;
  &:hover {
    color: ${({ theme }) => theme.ruby800}; 
  }
`;

export const AddBtn = styled(Button.Primary)`
  background: ${({ theme }) => theme.green400};
  border: none;
  padding: 0.4rem 1.6rem;
  font-size: 1.2rem;
  &:hover {
    background: ${({ theme }) => lighten(0.03, theme.green400)};
  }
`;

export const SelectedNumber = styled(T.P.Main)`
  margin: 0; 
  font-size: 1.4rem;
`;

export const ActionMenu = styled.div`
  margin: 2rem 0 2rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto);
  gap: 2rem;

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
  height: 1.5rem;
  width: 1.5rem;
  min-height: 1.5rem;
  min-width: 1.5rem;
`;
