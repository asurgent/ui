import styled from 'styled-components';

export const FormStyle = styled.form`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
        box-shadow:0 0 0 1000px white inset;
        -webkit-box-shadow:0 0 0 1000px white inset;
    }
`;

export const FormRow = styled.div`
    display: block;
    margin-bottom: 1.5rem;
    width: 100%;
    flex-grow: 1;
    min-width: 50%;
`;
