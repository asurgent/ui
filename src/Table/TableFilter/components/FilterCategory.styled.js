import styled from 'styled-components';

export const FilterWrapper = styled.div``;

export const ListWrapper = styled.div`
    flex:1;
    display: flex;
    position: relative;
    overflow:hidden;

    &:after {
        display:  ${({ disabled }) => (disabled ? 'block' : 'none')};
        content: " ";
        background: ${({ theme }) => theme.rgba(theme.white, 0.8)};
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
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
    min-width: 40rem;
    height: auto;
    max-height: 50rem;
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
        right: 1.6rem;
        top: 1.6rem;
    }
`;


export const MobileContent = styled.div`
    max-height: 100vh;
    padding-top: 2.4rem;
    display: flex;
    flex-direction: column;
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
