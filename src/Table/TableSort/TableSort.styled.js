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
        max-width: 100%;
        background-color: ${({ theme }) => theme.gray50};
        border-radius: 3px;
        border: none;
        font-size: 1.4rem;
    }
`;
