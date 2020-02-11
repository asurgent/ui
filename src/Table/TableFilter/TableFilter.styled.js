import styled from 'styled-components';

export const Filter = styled.div`
    /* padding:  */
`;


const Base = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.6rem;
`;
export const Active = styled(Base)`
    width: 3.2rem;
`;

export const Exclude = styled(Base)`
    visibility: hidden;
    border-left: 1px solid ${({ theme }) => theme.gray200};
`;

export const FilterItem = styled.div`
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid ${({ theme }) => theme.gray200};   

    .filter-label {
        flex: 1;
        display: block;
        text-align: left;
        font-size: 1.1rem;
        font-weight: 700;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 1.6rem;
    }

    &:hover {
        background: ${({ theme }) => theme.gray50};
        ${Exclude} {
            visibility: visible;
        }
    }
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

export const Wrapper = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    height: auto;
    justify-content: flex-start;
    align-items: center;
    margin: 0.8rem 0; 

    ${Filter} {
        margin-right: 1rem;
    }
`;
