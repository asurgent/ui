import styled from 'styled-components';

export const Label = styled.label`
    display: flex;
    position: relative;
    align-items: center;
    font-size: 1.4rem;
    letter-spacing: .1rem;
    color: ${({ theme }) => theme.gray700};
    text-transform: capitalize;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100%;
`;

export const RadioWrapper = styled.div`
    display: flex;
    flex-direction: ${({ vertical }) => (vertical === true ? 'column' : 'row')};
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 1.6rem;

    ${Label} {
        margin-right: 1.6rem;
    }
`;

export const FieldSet = styled.fieldset`
    border: none;
    margin: 0;
    padding: 0;
    padding: 1.05rem 1.2rem;
    /* needed for some weird fieldset behavior, overflows otherwise in the background */
    min-width: 0; 
`;

export const CheckMark = styled.span`
    position: absolute;
    height: 2rem;
    width: 2rem;
    background-color: #fff;
    border: 0.2rem solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    &:after {
        display: none;
        content: "";
        position: relative;
        width: 50%;
        height: 50%;
        border-radius: 100%;
    }
`;

export const Text = styled.span`
    margin-left: 2.4rem;
    line-height: 1.6rem;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const RadioInput = styled.input`
    width: 2rem!important;
    height: 2rem!important;   
    margin: 0; 
    /* change border color and draw the dot */
    &:checked + ${CheckMark} {
    border: ${({ theme, disabled }) => `0.2rem solid ${disabled ? theme.gray400 : theme.blue900}`};
        &:after {
            display: block;
        }
    }
    ~ ${CheckMark} {
        border-color: ${({ theme, disabled }) => (disabled ? theme.gray400 : theme.blue900)};
        &:after {
            background: ${({ theme, disabled }) => (disabled ? theme.gray400 : theme.blue900)};
        }
    }
    ~ ${Text} {
        color: ${({ theme, disabled }) => (disabled ? theme.gray400 : theme.black)};
    }
`;
