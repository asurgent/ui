import styled from 'styled-components';
import { KeyboardDatePicker } from '@material-ui/pickers';

export const DatePicker = styled(KeyboardDatePicker)`
    .MuiOutlinedInput-root {
        background: transparent;
        padding-right: 0!important;
    }

    .MuiInputBase-root input {
        box-sizing: border-box;
        min-height: 4.7rem; 
        font-size: 1.6rem;    
        
    }


    fieldset {   
        border: 0rem solid!important;
        border-color: ${({ theme }) => `${theme.gray200}!important`};
        border-radius: 5px!important;
    }

    input {
        padding: 0!important;
        margin: 0!important;
        min-height: 2.4rem!important;

    }
`;
