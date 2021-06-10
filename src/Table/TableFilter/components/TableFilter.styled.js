import styled from 'styled-components';
import * as Button from '../../../Button/Button.styled';

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    grid-column-gap: 0;
    grid-template-areas:
        "filters "
        "clear";

    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointDesktop * 10}px`}) {
        grid-template-areas: "filters clear";
        grid-column-gap: 0.5rem;
    }

    ${Button.Plain} {
        grid-area: clear;
        align-self: flex-start;
        span {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            font-size: 0.75rem;
            line-height: 1.125rem;
            text-transform: uppercase;
            padding: 0.375rem 0.5rem;
            border-radius: 3px;
            transition: .03s;

            &:hover {
              background: ${({ theme }) => theme.gray100};
            }

            svg {
                color:  ${({ theme }) => theme.black};
                margin-right: 0.5rem;
            }
        }
    }
`;

export const Filters = styled.div`
    grid-area: filters;
    display: flex;
    flex-wrap: wrap;
    > * {
        margin-right: 0.25rem;
        margin-bottom: 0.25rem;
    }
`;
