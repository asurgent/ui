import styled from 'styled-components';
import { lighten, darken } from 'polished';

export const Button = styled.div`
    border: 1px solid ${({ theme }) => theme.borderColor};
    background: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => (theme.textColor ? theme.textColor : theme.white)};
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.03s;
    white-space: normal;
    padding: 1.2rem 1.4rem;
    border-radius: 3px;

    .label {
        display: flex;
        align-items: center;
        justify-content: center;

        font-family: 'Lato', sans-serif;
        text-align: center;
        letter-spacing: 0.13rem;
        text-decoration: none;    
        font-size: 1.4rem;

        /* NEW */
        /* text-transform: lowercase; */
         /* &:first-letter  {
            text-transform: uppercase;
        } */

        /* OLD */
        text-transform: uppercase;
        font-weight: bold;
    }

    &:visited {
        border: 1px solid ${({ theme }) => theme.borderColor};
        background: ${({ theme }) => theme.backgroundColor};
        color: ${({ theme }) => (theme.textColor ? theme.textColor : theme.white)};
    }

    &:hover {
        cursor: pointer;
        border-color: ${({ theme }) => lighten(0.03, theme.borderColor)};
        background: ${({ theme }) => lighten(0.03, theme.backgroundColor)};
        color: ${({ theme }) => lighten(0.03, (theme.textColor ? theme.textColor : theme.white))};
    }

    &:active {
        border-color: ${({ theme }) => darken(0.03, theme.borderColor)};
        background: ${({ theme }) => darken(0.03, theme.backgroundColor)};
        color: ${({ theme }) => darken(0.03, (theme.textColor ? theme.textColor : theme.white))};
    }

    &.disabled {
        cursor: not-allowed;

        &:active,&:hover {
            border: 1px solid ${({ theme }) => theme.borderColor};
            background: ${({ theme }) => theme.backgroundColor};
            color: ${({ theme }) => (theme.textColor ? theme.textColor : theme.white)};
        }

        &:before {
            content: '';
            position: absolute;
            background: ${({ theme }) => theme.rgba(theme.white, 0.5)};
            display: block;
            top: -1px;
            right: -1px;
            bottom: -1px;
            left: -1px;
            border-radius: 3px;
            transition: 0.2s;
        }
    }
`;

export const Spacer = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: ${({ left }) => (left ? '.4rem' : 0)};
    margin-right: ${({ right }) => (right ? '.4rem' : 0)};
`;

export const Plain = styled.div`
    cursor: pointer;
    margin: 0;
    padding: 0;
    color: ${({ theme }) => theme.black};
`;

export const Link = styled.div`
    cursor: pointer;
    display: inline-block;
    border: none;
    outline: none;
    margin: 0;
    padding: 0;
    color: ${({ theme }) => theme.black};
    text-decoration: underline;
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
