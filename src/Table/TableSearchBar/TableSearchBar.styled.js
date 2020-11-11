import styled from 'styled-components';
import Icon from './Icon.svg';

export const SearchBarContainer = styled.div`
    position: relative;

    .custom-table-search {
        border-radius: 5rem;

        input {
            border-radius: 5rem;
            margin-left: 3.2rem;
        }
     
        &:before {
          content: url(${Icon});
          position: absolute;
          left: 1.4rem;
          top: 1.1rem;
          height: 2.4rem;
          width: 2.4rem;
        }
    }
`;

export const SearchBarBlocker = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: transparent;
`;
