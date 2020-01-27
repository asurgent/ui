import styled from 'styled-components';

export const Logo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.blue800};
    border-bottom: 1px solid ${({ theme }) => theme.blue800};
    filter: drop-shadow(0 1px 6px ${({ theme }) => theme.rgba(theme.black, 0.2)});

    svg {
        fill: ${({ theme }) => theme.white};
        width: 60%;
    }
`;

export const Top = styled.div`
    background: ${({ theme }) => theme.white};
    border-bottom: 1px solid ${({ theme }) => theme.gray300};
    padding: 2.4rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    z-index: 1;
`;

export const Left = styled.div`
    background: ${({ theme }) => theme.blue900};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2.4rem;
`;

export const NavigationItem = styled.div`
    margin: .8rem 0;

    i {
        color: #fff;
    }
`;

export const Content = styled.div`
    background: ${({ theme }) => theme.gray200};
    position: relative; 
    overflow-y: auto;
    overflow-x: auto;
    height: 100%;
    max-height: 100%;
    min-height: 100%;
    width: 100%;
    max-width: 100%;
    min-width: 100%;
`;

export const Main = styled.div`
    display: grid;
    height: 100vh;
    width: 100vw;
    background: ${({ theme }) => theme.gray200};
    position: relative;

    grid-template-columns: 6rem 1fr 1fr;
    grid-template-rows: 6rem 1fr;
    grid-row-gap: 0;
    grid-template-areas: 
        "logo top top"
        "left main main";

    ${Logo} {
        grid-area: logo;
    } 

    ${Top} {
        grid-area: top;
    } 

    ${Left} {
        grid-area: left;
    }

    ${Content} {
        grid-area: main;
    } 
`;
