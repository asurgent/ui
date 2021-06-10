import styled from 'styled-components';
import { lighten, darken } from 'polished';
/*
    lighten and darken-funcs needs to have format
    "({theme}) => X && lighten(0.1, X)"
    just having
    "({theme}) => lighten(0.1, X)"
    throws test errors
*/

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
    padding: 0.5rem 1rem;
    border-radius: 3px;
    white-space: nowrap;

    button {
        cursor: pointer;
        width: 100%;
        height: 100%;
        position: absolute;
        border-color: transparent;
        background-color: transparent;
    }

    .label {
        display: flex;
        align-items: center;
        justify-content: center;

        font-family: 'Poppins', sans-serif;
        text-align: center;
        letter-spacing: 0.05rem;
        text-decoration: none;
        font-size: 0.875rem;
        text-transform: uppercase;
        font-weight: 500;
    }

    &:visited {
        border: 1px solid ${({ theme }) => theme.borderColor};
        background: ${({ theme }) => theme.backgroundColor};
        color: ${({ theme }) => (theme.textColor ? theme.textColor : theme.white)};
    }

    &:hover {
        cursor: pointer;
        border-color: ${({ theme }) => theme.borderColor && lighten(0.03, theme.borderColor)};
        background: ${({ theme }) => theme.backgroundColor && lighten(0.03, theme.backgroundColor)};
        color: ${({ theme }) => lighten(0.03, (theme.textColor ? theme.textColor : theme.white))};
    }

    &:active {
        border-color: ${({ theme }) => theme.borderColor && darken(0.03, theme.borderColor)};
        background: ${({ theme }) => theme.backgroundColor && darken(0.03, theme.backgroundColor)};
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
    margin-left: ${({ left }) => (left ? '0.5rem' : 0)};
    margin-right: ${({ right }) => (right ? '0.5rem' : 0)};
    svg {
        margin-top: -1px;
    }
`;

export const Plain = styled.div`
    cursor: pointer;
    margin: 0;
    padding: 0;
    color: ${({ theme }) => theme.black};
    position: relative;
    display: inline-block;
    align-self: center;
    width: 100%;

    button {
        cursor: pointer;
        width: 100%;
        height: 100%;
        position: absolute;
        border-color: transparent;
        background-color: transparent;
    }

    &.disabled {
        cursor: not-allowed;
        opacity: .5;
    }
`;

export const Filter = styled(Button)`
    padding: 0.375rem 0.5rem;
    background-color: ${({ theme }) => theme.gray50};
    color: ${({ theme }) => theme.black};
    border-color: transparent;
    position: relative;
    transition: 0.05s;
    border: none;

    button {
        cursor: pointer;
        width: 100%;
        height: 100%;
        position: absolute;
        border-color: transparent;
        background-color: transparent;
    }

    &:hover {
      background: ${({ theme }) => theme.gray100};
      color: ${({ theme }) => darken(0.02, (theme.textColor))};
    }

    .label {
        font-size: 0.5625rem;
        line-height: 0.625rem;
    }
`;

export const Link = styled.div`
    cursor: pointer;
    border: none;
    outline: none;
    margin: 0;
    padding: 0;
    color: ${({ theme }) => theme.blue800};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &:hover {
        text-decoration: underline;
    }

    button {
        cursor: pointer;
        width: 100%;
        height: 100%;
        position: absolute;
        border-color: transparent;
        background-color: transparent;
    }

    .label {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const Icon = styled.div`
    width: 2rem;
    height: 2rem;
    min-width: 2rem;
    min-height: 2rem;
    max-width: 2rem;
    max-height: 2rem;
    border-radius: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    transition: 0.2s;
    text-align: center;
    white-space: normal;
    font-weight: 500;
    letter-spacing: 0.05rem;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 1rem;
    color: ${({ theme }) => theme.black};

    button {
        cursor: pointer;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        position: absolute;
        border-color: transparent;
        background-color: transparent;
    }

    &:hover {
        cursor: pointer;
        background: ${({ theme }) => theme.gray100};
    }

    &.disabled {
        cursor: not-allowed;
        opacity: .5;
    }
`;

export const Pill = styled(Button)`
    position: relative;
    background: #A1F0E8;
    box-shadow: 0px 10px 30px ${({ theme }) => theme.rgba('#A1F0E8', 0.3)};
    border-radius: 6.25rem;
    font-weight: bold;
    padding: 1.25rem 2rem;

    button {
        cursor: pointer;
        width: 100%;
        height: 100%;
        border-radius: 6.25rem;
        position: absolute;
        border-color: transparent;
        background-color: transparent;
    }

    .label {
        color: ${({ theme }) => theme.textColor};
    }

    &:hover {
        cursor: pointer;

        &:before {
            background: ${({ theme }) => theme.rgba('#c7fff9', 0.5)};
            border-radius: 6.25rem;
        }
    }
`;

export const CreateBlock = styled.div`
    background: ${({ theme }) => theme.white};;
    border: 2px dashed ${({ theme }) => theme.gray300};
    box-sizing: border-box;
    height: 8rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    color: ${({ theme }) => theme.blue800};
    margin-bottom: 1rem;
    font-weight: 500;

    &:hover {
        cursor: pointer;
        border: 2px dashed ${({ theme }) => theme.gray400};
    }

    .label {
        display: flex;
        align-items: center;
        justify-content: center;

        font-family: 'Poppins', sans-serif;
        text-align: center;
        letter-spacing: 0.05rem;
        text-decoration: none;
        font-size: 0.875rem;
        text-transform: uppercase;
        font-weight: 500;
    }
`;

export const Stretched = styled.div`
    flex: 1;
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    border: none;
    color: ${({ theme }) => theme.blue900};

    .label {
        display: flex;
        align-items: center;
        justify-content: center;

        font-family: 'Poppins', sans-serif;
        text-align: center;
        letter-spacing: 0.05rem;
        text-decoration: none;
        font-size: 0.875rem;
        text-transform: uppercase;
        font-weight: 500;
    }
`;
