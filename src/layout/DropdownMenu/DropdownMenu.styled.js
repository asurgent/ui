import styled from 'styled-components';

export const MenuWrapper = styled.div`
    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointDesktop * 10}px`}) {
        position: absolute;
        right: 20px;
    }
`;

export const DesktopMenu = styled.div`
    position: absolute;
    width: auto;
    min-width: 28rem;
    height: auto;
    padding: .8rem 0;
    border-radius: 5px;
    background: ${({ theme }) => theme.white};
    border: 1px solid ${({ theme }) => theme.gray300};
    box-shadow: 0 6px 10px -5px ${({ theme }) => theme.rgba(theme.black, 0.2)};
    top: 5px;
    right: -1px;

    .user-details {
      padding: 1.6rem;
      border-bottom: 1px solid ${({ theme }) => theme.gray300};
    }

    form {
        padding: 1.6rem;
        border-bottom: 1px solid ${({ theme }) => theme.gray300};
    }

    form > div {
        margin-bottom: 0;
    }

    b {
        display: inline-block;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
    }

    small {
        display: block;
        font-size: 1.2rem;
        line-height: 1.6rem;
    }
    .plain {
        background: ${({ theme }) => theme.gray100};
    }
`;

export const CreateTitle = styled.div``;

export const CreateItem = styled.div`
    display: grid;
    grid-template-columns: 2.1875rem 1fr;
    grid-column-gap: 1.6rem;
    grid-template-areas:
        "logo title"
        "logo desc";
    padding: 1.2rem 2.4rem;
    width: 100%;

    &:hover {
        background: ${({ theme }) => theme.gray50};
    }

    .create-icon {
        grid-area: logo;
        align-self: center;
        font-weight: 500;
    }
    ${CreateTitle} {
        grid-area: title;
    }
`;

export const DesktopMenuFooter = styled.div`
    padding-top: .8rem;
`;

export const MobileMenu = styled.div`
    position: fixed;
    top: -1px;
    bottom: -1px;
    left: -1px;
    right: -1px;
    background: ${({ theme }) => theme.white};
    border: 1px solid ${({ theme }) => theme.gray300};
    display: flex;
    flex-direction: column;

    .close {
        position: absolute;
        right: 2.4rem;
        top: 2.4rem;
    }
    .user {
        padding: 3.2rem 2.4rem;
        height: auto;
        display: grid;
        grid-template-columns: min-content auto;
        grid-column-gap: 1.6rem;
        border-bottom: 1px solid ${({ theme }) => theme.gray300};

        b {
            display: inline-block;
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
        }
        small {
            display: block;
            font-size: 1.2rem;
            line-height: 1.6rem;
        }
    }
    .menu {
        flex: 1;
        overflow-y: auto;
        flex-flow: column;
        display: flex;

        form {
            padding: 2.4rem;
        }
    }
    .wrapper {
        padding .8rem 0;
    }
`;

export const TabButton = styled.div`
    cursor:pointer;
    width: 100%;
    padding: 1.6rem;
    font-size: 1.4rem;
    font-weight: 500;
    background: ${({ active, theme }) => (active ? theme.white : theme.gray100)};
    text-transform: uppercase;
    text-align: center;
    font-family: 'Poppins', sans-serif;
`;

export const Tabs = styled.div`
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

export const Mobile = styled.div`
    display: flex;
    align-items: flex-start;
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
