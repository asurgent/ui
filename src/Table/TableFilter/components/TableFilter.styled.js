import styled from 'styled-components';
import * as Button from '../../../Button/Button.styled';

export const Wrapper = styled.div`
    grid-row-gap: .8rem;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-column-gap: .8rem;
    grid-row-gap: .8rem;
    grid-template-areas: 
        "filters "
        "clear";

    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointDesktop * 10}px`}) {
        grid-template-areas: "filters clear";
    }   

    ${Button.Plain} {
        grid-area: clear;
        span {
            display: flex;
            justify-content: center;
            align-items: center;
            color:  ${({ theme }) => theme.gray700};

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
    > * {
        margin-left: .6rem;

        &:first-child{
            margin-left: 0;
        }
    }
`;
