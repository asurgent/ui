import React, { useState } from 'react';
import MomentUtils from '@date-io/moment';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import * as C from '../CronEditor.styled';

const propTypes = {
  repeat: PropTypes.string.isRequired,
  endRepeatDate: PropTypes.instanceOf(Object).isRequired,
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {};


const RepeatEndDate = ({
  repeat,
  endRepeatDate,
  onChange,
}) => {
  const [endRepeat, setEndRepeat] = useState('never');

  const handleEndRepeat = (event) => {
    setEndRepeat(event.target.value);
  };

  if (repeat !== 'never') {
    return (
      <C.Row>
        <FormControl>
          <InputLabel id="repeat-select-label">End repeat</InputLabel>
          <Select
            labelId="repeat-select-label"
            id="repeat-select"
            value={endRepeat}
            onChange={handleEndRepeat}
          >
            <MenuItem value="never">Never</MenuItem>
            <MenuItem value="date">On date</MenuItem>
          </Select>
        </FormControl>
        { endRepeat === 'date' && (
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            id="date-picker-dialog"
            label="Start date"
            format="DD-MM-YYYY"
            value={endRepeatDate}
            onChange={onChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        )}
      </C.Row>
    );
  }

  return null;
};


RepeatEndDate.propTypes = propTypes;
RepeatEndDate.defaultProps = defaultProps;
RepeatEndDate.displayName = '@asurgent.ui.CronEditor.RepeatEndDate';

export default RepeatEndDate;
