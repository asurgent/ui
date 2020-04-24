import styled from 'styled-components';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';

export const DatePicker = styled(KeyboardDatePicker)`
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
