import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding: 3.2rem;
`;
export const Navigation = styled.div`
    display: flex;
    flex-direction: column;
    width: 25rem;
    margin-right: 3.2rem;
`;
export const NavigationItem = styled(NavLink)`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 3.2rem;
    color: ${({ theme }) => theme.black};
    font-size: 1.6rem;
    line-height: 2rem;
    border-left: 2px solid transparent;
    margin-bottom: .8rem;

    &.active {
        background-color: #F9F9F9;
        border-color: #133A5D;
        font-weight: bold;
    }
`;

export const Icon = styled.div`
    margin-left: 1.6rem;
    margin-right: 1.6rem;
`;
export const Label = styled.div``;
export const Content = styled.div`
    h1 {
        font-family: "Poppins";
        font-style: normal;
        font-weight: normal;
        font-size: 23.04px;
        line-height: 28px;
    }

    h2 {
        padding: 0;
        margin-top: 0;
        font-family: "Poppins";
        font-style: normal;
        font-weight: 500;
        font-size: 19.2px;
        line-height: 24px;
    }
`;
