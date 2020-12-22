import styled from 'styled-components';
import * as Button from '../../Button/Button.styled';

export const SortWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;

    ${Button.Icon} {
        margin: 0 .6rem;
    }

    .custom-table-sort-select {
        border: 1px solid ${({ theme }) => theme.gray300};
        max-width: 100%;
        background-color: none;
        @media screen and (min-width: ${(prop) => `${prop.theme.breakPointDesktop * 10}px`}) {
            border: none;
        }
    }
`;
