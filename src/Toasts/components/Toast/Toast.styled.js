import styled from 'styled-components';
import * as C from '../../constants';

const getColor = (theme, type) => {
  switch (type) {
    case C.TYPE_SUCCESS:
      return {
        border: theme.green900,
        background: theme.green100,
      };
    case C.TYPE_INFORMATION:
      return {
        border: theme.blue800,
        background: theme.blue100,
      };
    case C.TYPE_ERROR:
      return {
        border: theme.ruby800,
        background: theme.ruby100,
      };
    case C.TYPE_WARNING:
      return {
        border: theme.gold900,
        background: theme.gold50,
      };
    default:
      return {
        border: theme.blue800,
        background: theme.blue100,
      };
  }
};

export const Message = styled.div`
    word-break: break-all;
`;

export const Toast = styled.div`
    position: relative;
    display: grid;
    width: 32rem;
    justify-content: center;
    align-items: center;
    grid-template-columns: 1fr 2rem;
    grid-column-gap: .8rem;
    grid-template-areas: "text close";
    padding: 1.6rem;
    border-radius: 5px;
    box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.1);
    background-color: ${({ theme }) => theme.white};
    color: ${({ theme, type }) => getColor(theme, type).border};
    margin-bottom: .8rem;

    .close {
        fill: ${({ theme }) => theme.black};
        right: .4rem;
        height: 2rem;
        width: 2rem;
        cursor: pointer;
    }
`;

export const Bar = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    height: .4rem;
    background-color: ${({ theme, type }) => getColor(theme, type).border};
    width: ${({ done }) => `${100 - done}%`};
    transition: width 100ms;
    border-top-right-radius: 5px;
    border-top-left-radius: ${({ done }) => (done > 10 ? '0px' : '5px')};
`;
