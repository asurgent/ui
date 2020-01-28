import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;

export const Name = styled.div`
    display: flex;
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    margin: 0 1.6rem;
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
