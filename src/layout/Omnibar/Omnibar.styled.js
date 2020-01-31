import styled from 'styled-components';

export const Omnibar = styled.div`
    z-index: 1;
    position: relative;
    background: ${({ theme }) => theme.white};
    filter: drop-shadow(0 1px 3px ${({ theme }) => theme.rgba(theme.black, 0.2)});
    min-height: 9.5rem;
    height: fit-content;
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
