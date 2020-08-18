import styled from 'styled-components';

export const Omnibar = styled.div`
    top: 0;
    background: ${({ theme }) => theme.white};
    box-shadow: 0 6px 10px -5px ${({ theme }) => theme.rgba(theme.black, 0.2)};
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: .8rem;
    margin-bottom: .8rem;

    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointDesktop * 10}px`}) {
        padding: 1.6rem;
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
