import styled from 'styled-components';
import * as T from '../../../Typography';

export const Wrapper = styled.div`
    display: grid;
    padding: 1rem;
    grid-row-gap: 1rem;
    grid-template-columns: 1fr;
    grid-template-areas:
        "navigation"
        "title"
        "content";
    overflow-x: auto;

    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointTablet * 10}px`}) {
        overflow-x: unset;
        grid-column-gap: 2.5rem;
        grid-template-columns: 15.625rem minmax(12.5rem , 63.125rem);
        grid-template-areas:
            ". title"
            "navigation content";
    }
    
    ${T.Title.H1} {
        grid-area: title;
    }
`;

export const Content = styled.div`
    flex: 1;
    grid-area: content;
    overflow-x: auto;
    
    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointTablet * 10}px`}) {
        overflow-x: unset;
    }
`;

export const Group = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid ${({ theme }) => theme.gray300};
    border-radius: 3px;
    margin-top: 1rem;

    &:first-of-type{
        margin-top: 0;
    }
`;

export const Navigation = styled.div`
    grid-area: navigation;
    display: flex;
    flex-direction: column;
`;

export const NavigationItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 2.5rem;
    color: ${({ theme }) => theme.black};
    font-size: 1.2.5rem;
    line-height: 1.25rem;
    padding-left: 1rem;

    &:last-of-type {
        border-bottom: none;
    }

    &:hover {
        background: ${({ theme }) => theme.gray50};
    }

    &.active {
        background-color: ${({ theme }) => theme.gray100};
        font-weight: bold;
    }
`;

export const Label = styled.div``;
