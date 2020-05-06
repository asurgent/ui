import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from '@material-ui/core';
import * as C from './CronEditor.styled';
import RepeatOutput from './components/RepeatOutput';
import RepeatMonth from './components/RepeatMonth';
import RepeatEndDate from './components/RepeatEndDate';
import ThemeProvider from './components/ThemeProvider';
import RepeatWeek from './components/RepeatWeek';
import translation from './CronEditor.translation';
import useCronHook from './useCronHook';

const { t } = translation;

const propTypes = {
  onlyCustom: PropTypes.bool,
  end: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]).isRequired,
  start: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  duration: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  expression: PropTypes.string.isRequired,
};

const defaultProps = {
  onlyCustom: true,
};

const CronEditor = ({
  end,
  start,
  duration,
  expression,
  onlyCustom,
  onChange,
}) => {
  const hook = useCronHook({
    end,
    start,
    duration,
    expression,
    onChange,
  });

  return (
    <C.Columns>
      <C.Editor>
        <ThemeProvider>
          <C.Row>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                label={t('startDate', 'asurgentui')}
                format="DD-MM-YYYY"
                value={hook.getStartDate()}
                onChange={hook.handleStartDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardTimePicker
                ampm={false}
                minutesStep={5}
                label={t('startTime', 'asurgentui')}
                value={hook.getStartDate()}
                onChange={hook.handleStartDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </MuiPickersUtilsProvider>
          </C.Row>
          <C.Row>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                label={t('endDate', 'asurgentui')}
                format="DD-MM-YYYY"
                value={hook.getEndDate()}
                onChange={hook.handleEndDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardTimePicker
                ampm={false}
                minutesStep={5}
                label={t('endTime', 'asurgentui')}
                value={hook.getEndDate()}
                onChange={hook.handleEndDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </MuiPickersUtilsProvider>
          </C.Row>
          {!onlyCustom && (
            <C.Row>
              <FormControl>
                <InputLabel id="repeat-select-label">{t('repeat', 'asurgentui')}</InputLabel>
                <Select
                  labelId="repeat-select-label"
                  id="repeat-select"
                  value={hook.getRepeat()}
                  onChange={hook.handleRepeatChange}
                >
                  {
                    hook.getRepeatTypes()
                      .map((type) => (
                        <MenuItem key={type} value={type}>{t(type, 'asurgentui')}</MenuItem>
                      ))
                  }
                </Select>
              </FormControl>
            </C.Row>
          )}

          <RepeatWeek
            repeat={hook.getRepeat()}
            everyWeek={hook.getEveryWeek()}
            weekDayRepeat={hook.getWeekDayRepeat()}
            onChange={hook.handleWeekDayRepeat}
            onChangeTimes={hook.handleEveryWeek}
          />

          <RepeatMonth
            repeat={hook.getRepeat()}
            everyMonth={hook.getEveryMonth()}
            monthDaysRepeat={hook.getMonthDaysRepeat()}
            onChange={hook.handleEveryMonthChange}
            onChangeTimes={hook.handleMonthDaysRepeat}
          />

          { hook.isRepeatCustom() && (
            <C.Row>
              <TextField
                label={t('expression', 'asurgentui')}
                value={hook.getExpression()}
                onChange={hook.handleExpressionChange}
              />
            </C.Row>
          )}

          <RepeatEndDate
            hook={hook}
            repeat={hook.getRepeat()}
            endRepeat={hook.getEndRepeat()}
            onEndRepeatChange={hook.handleEndRepeat}
            onChange={hook.handleEndRepeatDate}
          />

        </ThemeProvider>
      </C.Editor>
      {hook.isRepeatNever() && (
        <RepeatOutput
          withBorder
          repeat={hook.getRepeat()}
          startDate={hook.getStartDate()}
          cronExpression={hook.getExpression()}
        />
      )}

    </C.Columns>
  );
};

CronEditor.propTypes = propTypes;
CronEditor.defaultProps = defaultProps;
CronEditor.displayName = '@asurgent.ui.CronEditor';

export default CronEditor;
