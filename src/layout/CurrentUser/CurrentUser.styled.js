import styled from 'styled-components';
import * as Button from '../../Button/Button.styled';

export const Wrapper = styled.div`
    ${Button.Plain} {
        span {
            display: flex;
            position: relative;
            align-items: center;
            justify-content: center;
        }
    }
`;

export const Name = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: Lato;
    margin: 0 1.6rem;

    b {
        font-style: normal;
        font-size: 1.6rem;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        line-height: 1.6rem;
    }

    small {
        color: ${({ theme }) => theme.gray700};
        font-size: 1.2rem;
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

export const Desktop = styled.div`
    display: none;
    align-items: center;
    position: relative;

    @media screen and (min-width: ${(prop) => `${prop.theme.breakPointDesktop * 10}px`}) {
        display: flex;
    }
`;
