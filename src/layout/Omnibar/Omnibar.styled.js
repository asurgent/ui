import styled from 'styled-components';

export const Omnibar = styled.div`
    top: 0;
    z-index: 1;
    position: sticky;
    background: ${({ theme }) => theme.white};
    filter: drop-shadow(0 1px 3px ${({ theme }) => theme.rgba(theme.black, 0.2)});
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: .8rem;

    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointDesktop * 10}px`}) {
        min-height: 9.5rem;
        padding: 2.4rem;
    }   
`;

export const LeftActions = styled.div`
    justify-content: flex-start;
    display: flex;
    flex: 1;

`;
export const RightActions = styled.div`
    justify-content: flex-end;
    display: flex;
    flex: 1;
`;
