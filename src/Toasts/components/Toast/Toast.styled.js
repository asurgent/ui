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

export const Toast = styled.div`
    position: relative;
    display: block;
    width: 32rem;
    padding: 1.6rem;
    border-radius: 5px;
    border: 1px solid ${({ theme, type }) => getColor(theme, type).border};
    background-color: ${({ theme, type }) => getColor(theme, type).background};
    color: ${({ theme, type }) => getColor(theme, type).border};
    margin-bottom: .8rem;

    .close {
        fill: ${({ theme, type }) => getColor(theme, type).border};
        position: absolute;
        right: .4rem;
        top: .4rem;
        height:1.6rem;
        width:1.6rem;
        cursor: pointer;
    }
`;

export const Bar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    height: .4rem;
    background-color: ${({ theme, type }) => getColor(theme, type).border};
    width: ${({ done }) => `${done}%`};
    transition: width 100ms;
    border-top-left-radius: 5px;
`;
