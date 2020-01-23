import styled from 'styled-components';

// Kinda wacky thing to do, but whatever.
const defaultStyle = () => `
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    transition: 0.2s;
    text-align: center;
    padding: 0.9rem 1.6rem;
    border-radius: 5px;
    border: 1px solid transparent;
    white-space: normal;
    font-weight: bold;
    letter-spacing: 0.12rem;
    text-transform: uppercase;
    text-decoration: none;    
    font-size: 1.4rem;

    &:before {
        position: absolute;
        background: hsla(255, 0%, 100%, 0);
        z-index: 2;
        display: block;
        content: '';
        top: -1px;
        right: -1px;
        bottom: -1px;
        left: -1px;
        border-radius: 5px;
        transition: 0.2s;
      }

    &:hover {
        cursor: pointer;

        &:before {
            background: hsla(255, 0%, 100%, 0.05);
        }
    }

    &.disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

export const Spacer = styled.span`
    margin-left: ${({ left }) => (left ? '.4rem' : 0)};
    margin-right: ${({ right }) => (right ? '.4rem' : 0)};
`;

export const Plain = styled.div`
    cursor: pointer;
    display: inline-block;
    border: none;
    outline: none;
    margin: 0;
    padding: 0;
    color: ${({ theme }) => theme.black};
    text-decoration: underline;
`;

export const Primary = styled.div`
    ${(props) => defaultStyle(props)}
    background: ${({ theme }) => theme.brandPrimaryColor};
    color: ${(props) => props.theme.white};
 
    &:active,&:visited {
        color: ${(props) => props.theme.white};
    }
`;

export const Icon = styled.div`
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    transition: 0.2s;
    text-align: center;
    white-space: normal;
    font-weight: bold;
    letter-spacing: 0.12rem;
    text-transform: uppercase;
    text-decoration: none;    
    font-size: 1.6rem;
    color: ${({ theme }) => theme.black};

    &:hover {
        cursor: pointer;
        background: ${({ theme }) => theme.gray100};
    }
`;

export const Secondary = styled.div`
    ${(props) => defaultStyle(props)}
    background: ${({ theme }) => theme.brandSecondaryColor};
    color: ${(props) => props.theme.white};
 
    &:active,&:visited {
        color: ${(props) => props.theme.white};
    }
`;

export const Reject = styled.div`
    ${(props) => defaultStyle(props)}
    background: ${({ theme }) => theme.ruby800};
    color: ${(props) => props.theme.white};
 
    &:active,&:visited {
        color: ${(props) => props.theme.white};
    }
`;

export const Hollow = styled.div`
    ${(props) => defaultStyle(props)}
    color: ${(props) => props.theme.brandPrimaryColor};
    background: ${({ theme }) => theme.white};
    border-color: ${({ theme }) => theme.brandPrimaryColor};
 
    &:active,&:visited {
        color: ${(props) => props.theme.brandPrimaryColor};
    }
`;
