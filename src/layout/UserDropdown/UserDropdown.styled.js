import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;

export const Logout = styled.div`
    margin-top: 0.8rem;
    padding-top: 0.8rem;
    border-top: 1px solid ${({ theme }) => theme.gray200};
`;
export const Name = styled.div`
    display: flex;
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    margin: 0 1.6rem;
`;

export const Menu = styled.div`
    position: absolute;
    width: 280px;
    height: auto;
    padding: 2.4rem;
    border-radius: 5px;
    margin-top: .8rem;  
    background: ${({ theme }) => theme.white};
    border: 1px solid ${({ theme }) => theme.gray200};
    top: 100%;
    right: 0;

    i {
        margin-right: 1.6rem;
    }
`;
