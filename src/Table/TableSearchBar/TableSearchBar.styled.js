import styled from 'styled-components';

export const SearchBarContainer = styled.div`
    position: relative;

    .custom-table-search {
        border-radius: 5rem;

        input {
            border-radius: 5rem;
            margin-left: 3.2rem;
        }
        &:before {
          content: url("data:image/svg+xml; utf8, <svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' aria-hidden='true' focusable='false' width='1.5rem' height='1.5rem' style='-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);' preserveAspectRatio='xMidYMid meet' viewBox='0 0 24 24'><path d='M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z' fill='%23e6e6e6'/></svg>");
          position: absolute;
          left: 1.4rem;
          top: 1.1rem;
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
