import styled from 'styled-components';
import * as User from '../CurrentUser/CurrentUser.styled';
import { Omnibar } from '../Omnibar/Omnibar.styled';
import { Scene } from '../Scene/Scene.styled';

export const Logo = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.blue700};
    margin-bottom: -1px;
    box-shadow: 0 6px 10px -5px ${({ theme }) => theme.rgba(theme.black, 0.2)};

    svg {
        fill: ${({ theme }) => theme.white};
        width: 60%;
    }
`;

export const Top = styled.div`
    position: relative;
    background: ${({ theme }) => theme.white};
    padding: 1.6rem;
    display:flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 6rem;
    border-bottom: 1px solid ${({ theme }) => theme.gray300};

    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointDesktop * 10}px`}) {
        position: relative;
        /* z-index: unset; */
        width: 100%;
        box-shadow: none;
    }

    ${User.Wrapper} {
        margin-left: 3.2rem;
    }
`;

export const Left = styled.div`
    background: ${({ theme }) => theme.blue900};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2.4rem;
`;

export const Content = styled.div`
    display: grid;
    overflow: hidden;
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr;
    grid-template-areas:
        "omnibar"
        "scene";

    ${Omnibar} {
        grid-area: omnibar;
    }

    ${Scene} {
        grid-area: scene;
    }
`;

export const Main = styled.div`
    display: grid;
    height: 100vh;
    width: 100vw;
    background: ${({ theme }) => theme.white};
    position: relative;

    grid-template-columns: 6rem 1fr 1fr;
    grid-template-rows: 6rem 1fr;
    grid-template-areas:
        "top top top"
        "main main main";

    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointDesktop * 10}px`}) {
        grid-template-areas:
            "top top top"
            "left main main";
    }


    ${Logo} {
        grid-area: logo;
    }

    ${Top} {
        grid-area: top;
    }

    ${Left} {
        grid-area: left;
        display: none;

        @media screen and (min-width: ${(prop) => `${prop.theme.breakPointDesktop * 10}px`}) {
            display: flex;
        }
    }

    ${Content} {
        grid-area: main;
    }
`;
