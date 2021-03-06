import styled from 'styled-components';

export const FilterWrapper = styled.div`
    position: relative;
    &:after {
        content: "";
        position: absolute;
        bottom: 0;
        height: 2px;
        width: 100%;
        border-radius: 0 0 3px 3px;
        background-color: ${({ active }) => (active ? ({ theme }) => theme.blue800 : 'transparent')};
    }
`;

export const ShieldTargetWrapper = styled.div``;

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

export const Search = styled.div`
    padding: 0.5rem ;
    background-color: ${({ theme }) => theme.gray50};

    form {
        padding-right: 3rem;

        @media screen and (min-width: ${(prop) => `${prop.theme.breakPointMobile * 10}px`}) {
            padding-right: 0;
        }
    }
`;

export const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
`;

export const Dropdown = styled.div`
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
        right: 1rem;
        top: 1rem;
    }

    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointMobile * 10}px`}) {
        position: absolute;
        width: auto;
        height: auto;
        max-height: 31.25rem;
        top: -1rem;
        bottom: unset;
        min-width: 25rem;
        left: unset;
        right: unset;
        border-radius: 5px;
        background: ${({ theme }) => theme.white};
        border: 1px solid ${({ theme }) => theme.gray200};
        box-shadow: 0 6px 10px -5px ${({ theme }) => theme.rgba(theme.black, 0.2)};
        display: flex;
        flex-direction: column;

        .close {
            display: none;
        }
    }
`;

export const Mobile = styled.div`
    display: flex;
    align-items: center;
    position: relative;

    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointDesktop * 10}px`}) {
        display: none;
    }
`;
