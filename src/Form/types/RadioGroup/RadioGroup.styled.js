import styled from 'styled-components';

export const Label = styled.label`
    display: flex;
    position: relative;
    align-items: center;
    font-size: 1.4rem;
    letter-spacing: .1rem;
    color: ${({ theme }) => theme.gray700};
    text-transform: capitalize;
`;

export const RadioWrapper = styled.div`
    display: flex;
    flex-direction: ${({ wrapRadios }) => (wrapRadios === true ? 'column' : 'row')};
    align-items: flex-start;

    ${Label}:not(:first-child) {
        margin-left: 1.6rem;
    }
`;

export const FieldSet = styled.fieldset`
    border: none;
    padding: .8rem 0;
`;

export const CheckMark = styled.span`
    position: absolute;
    top: 0px;
    left: 0px;
    height: 2rem;
    width: 2rem;
    background-color: #fff;
    border: 0.2rem solid black ;
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
        background: ${({ theme }) => theme.blue900};
    }
`;

export const RadioInput = styled.input`
    width: 2rem;
    height: 2rem;   
    margin: 0; 
    /* change border color and draw the dot */
    &:checked + ${CheckMark} {
    border: ${({ theme }) => `0.2rem solid ${theme.blue900}`};
        &:after {
            display: block;
        }
    }
`;

export const Text = styled.span`
    margin-left: 2.4rem;
    line-height: 1.6rem;
`;
