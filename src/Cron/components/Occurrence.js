import React from 'react';
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
import translation from '../CronEditor.translation';

const { t } = translation;

const propTypes = {
  hook: PropTypes.instanceOf(Object).isRequired,
};

const defaultProps = {};

const Occurrence = ({ hook }) => (
  <C.Row>
    <FormControl>
      <InputLabel id="repeat-select-label">{t('end', 'asurgentui')}</InputLabel>
      <Select
        labelId="repeat-select-label"
        id="repeat-select"
        value={hook.getOccurrence()}
        onChange={hook.handleOccurrence}
      >
        {
          hook.getOccurrenceTypesList()
            .map((type) => (
              <MenuItem key={type} value={type}>{t(type, 'asurgentui')}</MenuItem>
            ))
        }
      </Select>
    </FormControl>
    { hook.willEndOnDate() && (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
          format="DD-MM-YYYY"
          minDate={hook.getStartDate()}
          value={hook.getEndDate()}
          onChange={hook.handleEndDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
    )}
  </C.Row>
);

Occurrence.propTypes = propTypes;
Occurrence.defaultProps = defaultProps;

export default Occurrence;
