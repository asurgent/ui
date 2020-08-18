import styled from 'styled-components';

export const Scene = styled.div`
    background: ${({ theme }) => theme.white};
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    display: block;
    padding-bottom: 3.2rem;

    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointDesktop * 10}px`}) {
        margin-top: 0;
    }
`;
