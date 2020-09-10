import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Wrapper = styled.div`
    display: grid;
    padding: 1.6rem;
    grid-row-gap: 1.6rem;
    grid-template-columns: 1fr;
    grid-template-areas:
        "navigation"
        "title"
        "content";

    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointTablet * 10}px`}) {
        grid-column-gap: 1.6rem;
        grid-template-columns: 25rem minmax(20rem , 101rem);
        grid-template-areas:
            ". title"
            "navigation content";
    }
`;

export const Title = styled.h1`
    grid-area: title;
    font-family: "Poppins";
    font-style: normal;
    font-weight: normal;
    font-size: 2.6rem;
    line-height: 3rem;
`;

export const Content = styled.div`
    flex: 1;
    grid-area: content;
    overflow-x: auto;

    h2 {
        padding: 0;
        margin-top: 0;
        font-family: "Poppins";
        font-style: normal;
        font-weight: 500;
        font-size: 2.2rem;
        line-height: 2.6rem;
    }
`;

export const Navigation = styled.div`
    grid-area: navigation;
    display: flex;
    flex-direction: column;
`;

export const NavigationItem = styled(NavLink)`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 3.2rem;
    color: ${({ theme }) => theme.black};
    font-size: 1.6rem;
    line-height: 2rem;
    border-left: 2px solid transparent;
    margin-bottom: .8rem;

    &.active {
        background-color: ${({ theme }) => theme.gray50};
        border-color: #133A5D;
        font-weight: bold;
    }
`;

export const Icon = styled.div`
    margin-left: 1.6rem;
    margin-right: 1.6rem;
`;

export const Label = styled.div``;
