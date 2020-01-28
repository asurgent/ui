import styled from 'styled-components';

export const MenuWrapper = styled.div`
    background: white;
    position: relative;

    .exit-icon {
        margin-right: .8rem;
    }
`;

export const DesktopMenu = styled.div`
    position: absolute;
    width: auto;
    min-width: 28rem;
    height: auto;
    padding: 2.4rem;
    border-radius: 5px;
    margin-top: .8rem;  
    background: ${({ theme }) => theme.white};
    border: 1px solid ${({ theme }) => theme.gray200};
    top: 100%;
    right: 0;
`;

export const DesktopMenuFooter = styled.div`
    margin-top: 1.6rem;
    border-top: 1px solid ${({ theme }) => theme.gray300};;
    padding-top: 1.6rem;
`;

export const MobileMenu = styled.div`
    position: fixed;
    top: -1px;
    bottom: -1px;
    left: -1px;
    right: -1px;
    background: ${({ theme }) => theme.white};
    border: 1px solid ${({ theme }) => theme.gray200};
    display: flex;
    flex-direction: column;

    .close {
        position: absolute;
        right: 2.4rem;
        top: 2.4rem;
    }
    .user {
        padding: 2.4rem;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 1.6rem;

        b {
            margin-top: 1.6rem;
        }
    }
    .menu {
        flex: 1;
        overflow-y: auto;
        padding: 2.4rem;
        justify-content: center;
        display: flex;
    }
`;

export const TabButton = styled.div`
    cursor:pointer;
    width: 100%;
    padding: 1.6rem;
    font-size: 1.4rem;
    font-weight: bold;
    background: ${({ active, theme }) => (active ? theme.white : theme.gray300)};
    text-transform: uppercase;
    text-align: center;
`;

export const Tabs = styled.div`
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;


export const Mobile = styled.div`
    display: flex;
    align-items: center;
    position: relative;

    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointDesktop * 10}px`}) {
        display: none;
    }   
`;


export const Desktop = styled.div`
    display: none;
    align-items: center;
    position: relative;

    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointDesktop * 10}px`}) {
        display: flex;
    }
`;
