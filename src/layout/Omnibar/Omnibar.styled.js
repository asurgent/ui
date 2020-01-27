import styled from 'styled-components';

export const Omnibar = styled.div`
    background: ${({ theme }) => theme.white};
    filter: drop-shadow(0 1px 3px ${({ theme }) => theme.rgba(theme.black, 0.2)});
    height: 6rem;
    padding: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    
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
