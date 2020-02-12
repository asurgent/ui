import styled from 'styled-components';

export const FilterWrapper = styled.div`
    margin-top: 0.8rem;
    margin-right: 1rem;
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
`;

export const Search = styled.div`
    padding: .8rem ;
    border-top: 1px solid ${({ theme }) => theme.gray200};
    border-bottom: 1px solid ${({ theme }) => theme.gray200};
`;

export const Dropdown = styled.div`
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


export const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.6rem;
`;
