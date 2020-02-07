import styled from 'styled-components';


export const SearchInput = styled.div``;
export const SortInput = styled.div``;
export const Filter = styled.div``;

export const StyleForm = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    /* grid-template-rows: 6rem 1fr; */
    grid-template-areas: 
        "search sort"
        "filter filter";
    grid-column-gap: 1.6rem;
    /* grid-row-gap: .8rem; */

    ${SearchInput} { 
      grid-area: search;
    }

    ${Filter} {
      grid-area: filter;
    }
    ${SortInput} {
      
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointMobile * 10}px`}) {
      grid-template-columns: 1fr auto;
      
      ${SortInput} {
        width: 200px;
      }
    }
`;
