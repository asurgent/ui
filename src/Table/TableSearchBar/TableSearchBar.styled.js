import styled from 'styled-components';

export const SearchBarContainer = styled.div`
    position: relative;

    .custom-table-search {
        border-radius: 3.125rem;
        max-width: 100%;
        border-color: transparent;

        input {
            border-radius: 3.125rem;
            padding-left: 3rem;
            border: 1px solid ${({ theme }) => theme.gray300};
            transition: all .1s ease-in-out;
            &:focus, &:hover {
                border-color: transparent;
                box-shadow: 0 1px 6px rgba(0,0,0,.2);
            }
        }
     
        &:before {
          content: url("data:image/svg+xml; utf8, <svg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' focusable='false' width='100%' height='100%' preserveAspectRatio='xMidYMid meet' viewBox='0 0 24 24'><path d='M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z' fill='rgb(230, 230, 230)'/></svg>");
          position: absolute;
          left: 0.875rem;
          top: 0.6875rem;
          height: 1.5rem;
          width: 1.5rem;
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
