import styled from 'styled-components';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';

export const DatePicker = styled(KeyboardDatePicker)`
    .MuiOutlinedInput-root {
        background: ${({ theme }) => theme.white};
    }
    .MuiInputBase-root input {
        box-sizing: border-box;
        min-height: 4.7rem; 
        font-size: 1.6rem;    
    }
    fieldset {   
        border: 0.1rem solid!important;
        border-color: ${({ theme }) => `${theme.gray200}!important`};
        border-radius: 5px!important;
    }
`;

export const DatePickerNative = styled.input`
    border: none;
    width: 100%;

`;

export const WrapperNative = styled.div`
    border: 0.1rem solid;
    border-color: #EAEAEA;
    border-radius: 5px;
    padding: 1.2rem;
    position: relative;
    box-sizing: border-box;
    min-height: 4.7rem;
    background: #FFFFFF;
    width: 100%;
    margin: 0;
`;
