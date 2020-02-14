import styled from 'styled-components';

export const FilterWrapper = styled.div`
    /* margin-right: 1rem; */
`;

export const List = styled.div`
    flex: 1;
    overflow-y: scroll;   
    position: relative;
`;

export const Header = styled.div`
    text-transform: lowercase;
    padding: 1.6rem;    
    font-size: 1.4rem;    
    color: ${({ theme }) => theme.gray500};
`;

export const Search = styled.div`
    padding: .8rem ;
    border-top: 1px solid ${({ theme }) => theme.gray200};
    border-bottom: 1px solid ${({ theme }) => theme.gray200};
`;


export const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.6rem;
`;

export const DesktopDropdown = styled.div`
    position: absolute;
    width: auto;
    min-width: 32rem;
    height: auto;
    max-height: 32rem;
    left: 0;
    border-radius: 5px;
    background: ${({ theme }) => theme.white};
    border: 1px solid ${({ theme }) => theme.gray200};
    box-shadow: 0 6px 10px -5px ${({ theme }) => theme.rgba(theme.black, 0.2)};
    display: flex;
    flex-direction: column;
`;

export const MobileDropdown = styled.div`
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
`;


export const MobileContent = styled.div`
    margin-top: 1.6rem;
    /* padding: 2.4rem; */
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
