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
        grid-column-gap: .8rem;
    }

    ${Button.Plain} {
        grid-area: clear;
        span {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            text-transform: uppercase;
            padding: .8rem;
            border-radius: 3px;
            transition: .03s;

            &:hover {
              background: ${({ theme }) => theme.gray100};
            }

            svg {
                color:  ${({ theme }) => theme.black};
                margin-right: .8rem;
            }
        }
    }
`;

export const Filters = styled.div`
    grid-area: filters;
    display: flex;
    flex-wrap: wrap;
    > * {
        margin-right: .4rem;
        margin-bottom: .4rem;
    }
`;
