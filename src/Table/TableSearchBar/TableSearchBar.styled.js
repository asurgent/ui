import styled from 'styled-components';

export const SearchBarContainer = styled.div`
    position: relative;

    .custom-table-search {
        border-radius: 5rem;
        
        input {
            border-radius: 5rem;
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
