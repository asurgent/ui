import styled from 'styled-components';

export const InputWrapper = styled.div`
    width: 100%;
    /* mock a normal select by making text not selectable */
    position: relative;
    user-select: none; 
    &::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`;

export const Input = styled.input`
    padding-right: 2rem;
    text-overflow: ellipsis;
    &:disabled {
        color: black!important;
    }
`;

export const FilterInput = styled.input`
    margin: 0;
    display: flex;
    align-items: center;
    border: .1rem solid!important;
    border-color: ${({ theme }) => theme.gray200}!important;
    border-radius: 5px;
    padding: 1.2rem;
    position: relative;
    box-sizing: border-box;
    min-height: 4.7rem;
    background: ${({ theme }) => theme.white};
`;

export const SelectFilter = styled.div`
    display: flex;
    width: 100%;
`;
export const FilterWrapper = styled.div``;

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
        right: 1.6rem;
        top: 1.6rem;
    }

    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointMobile * 10}px`}) {
        position: absolute;
        width: auto;
        height: auto;
        max-height: 50rem;
        top: unset;
        bottom: unset;
        min-width: unset;
        left: 0;
        right: 0;
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
export const Search = styled.div`
    padding: .8rem ;
    background-color: ${({ theme }) => theme.gray50};

    form {
        padding-right: 4.8rem;

        @media screen and (min-width: ${(prop) => `${prop.theme.breakPointMobile * 10}px`}) {
            padding-right: 0;
        }
    }
`;

export const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.6rem;
`;


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
