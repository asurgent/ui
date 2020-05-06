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

const RepeatEndDate = ({ hook }) => {
  if (hook.isRepeatCustom() || hook.isRepeatMonth() || hook.isRepeatWeek()) {
    return (
      <C.Row>
        <FormControl>
          <InputLabel id="repeat-select-label">{t('end', 'asurgentui')}</InputLabel>
          <Select
            labelId="repeat-select-label"
            id="repeat-select"
            value={hook.getEndRepeat()}
            onChange={hook.handleEndRepeat}
          >
            {
              hook.getEndRepeatTypes()
                .map((type) => (
                  <MenuItem key={type} value={type}>{t(type, 'asurgentui')}</MenuItem>
                ))
            }
          </Select>
        </FormControl>
        { hook.isEndRepeatDate() && (
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              id="date-picker-dialog"
              label={t('endDate', 'asurgentui')}
              format="DD-MM-YYYY"
              value={hook.getEndRepeatDate()}
              onChange={hook.handleEndRepeatDate}
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
