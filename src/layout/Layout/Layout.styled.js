import styled from 'styled-components';
import { BaseBlock } from '../../Block/Block.styled';
import * as User from '../CurrentUser/CurrentUser.styled';

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
    z-index: 2;
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.gray300};

    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointDesktop * 10}px`}) {
        position: relative;
        z-index: unset;
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
    background: ${({ theme }) => theme.white};
    position: relative;
    overflow-y: auto;
    overflow-x: auto;
    height: 100%;
    max-height: 100%;
    min-height: 100%;
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    margin-top: 1.6rem;
    

    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointDesktop * 10}px`}) {
        margin-top: 0;
    }

    > ${BaseBlock}:last-of-type {
        margin-bottom: 3.2rem;
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
