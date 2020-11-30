import styled from 'styled-components';

export const Controllbar = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-column-gap: 0;
    grid-row-gap: .8rem;
    grid-template-areas: 
        "search search"
        "sort sort"
        "filter filter ";

    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointDesktop * 10}px`}) {
        grid-template-areas: 
        "search sort"
        "filter . ";
        grid-column-gap: .8rem;
    }   

    .search {
        grid-area: search;
    } 
    .sort {
        grid-area: sort;
    } 
    .filter {
        grid-area: filter;
    } 
`;
