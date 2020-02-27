import React, { useState, useEffect } from 'react';
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
import RepeatWeek, { weekList } from './components/RepeatWeek';

const propTypes = {
  end: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  start: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  duration: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  expression: PropTypes.string.isRequired,
};

const defaultProps = {};

const CronEditor = ({
  end,
  start,
  duration,
  expression,
  onChange,
}) => {
  const [cronExpression, setCronExpression] = useState(expression);

  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [endRepeatDate, setEndRepeatDate] = useState(moment());

  const [repeat, setRepeat] = useState('never');

  const [everyWeek, setEveryWeek] = useState(1);
  const [everyMonth, setEveryMonth] = useState(1);

  const [weekDaysRepeat, setWeekDaysRepeat] = useState(['MON']);
  const [monthDaysRepeat, setMonthDaysRepeat] = useState([]);

  useEffect(() => {
    const cronList = expression
      .split(' ')
      .splice(0, 6);

    const [seconds, minutes, hours, days, month, weeek] = cronList;

    const newEnd = moment(start);
    newEnd.add(duration, 'seconds');

    setStartDate(moment(start));
    setEndDate(newEnd);
    setEndRepeatDate(moment(end));

    const [_, repeatEveryMonth] = month.split('/');
    setEveryMonth(parseInt((repeatEveryMonth || 1), 10));

    if (days !== '*' && days.split(',').length > 0) {
      setMonthDaysRepeat(days.split(',').map((i) => parseInt(i, 10)));
    }

    const [weekDays, repeatEveryWeek] = weeek.split('#');

    setEveryWeek(parseInt((repeatEveryWeek || 1), 10));
    if (weekDays !== '*' && weekDays.split(',').length) {
      const weekDaysRepeatParse = weekDays.split(',')
        .map((day) => {
          if (Number.isInteger(parseInt(day, 10))) {
            return `${weekList[parseInt(day, 10)]}`;
          }

          return day
            .substr(0, 3)
            .toUpperCase();
        });

      setWeekDaysRepeat(weekDaysRepeatParse);
    }
  }, []);

  useEffect(() => {
    const payload = {
      start: startDate.utc().toISOString(),
      end: endDate.utc().toISOString(),
      cron_expression: '',
      duration: endDate.diff(startDate, 'seconds'),
    };

    if (repeat === 'never') {
      onChange(payload);
    } else {
      Object.assign(payload, {
        end: endRepeatDate.utc().toISOString(),
        cron_expression: cronExpression,
      });
      onChange(payload);
    }
  }, [startDate, endDate, endRepeatDate, repeat, cronExpression]);

  useEffect(() => {
    const hours = startDate.hours();
    const minutes = startDate.minutes();
    if (repeat === 'month') {
      const days = monthDaysRepeat.join(',');
      const times = everyMonth > 0 ? `/${everyMonth}` : '';

      setCronExpression(`0 ${minutes} ${hours} ${days} *${times} *`);
    } else if (repeat === 'week') {
      const days = weekDaysRepeat.join(',');
      const times = everyWeek > 0 ? `#${everyWeek}` : '';

      setCronExpression(`0 ${minutes} ${hours} * * ${days}${times}`);
    }
  }, [startDate, weekDaysRepeat, everyMonth, everyWeek, monthDaysRepeat, repeat]);

  const handleStartDateChange = (date) => {
    if (date <= endDate) {
      setStartDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    if (date >= startDate) {
      setEndDate(date);
    }
  };

  return (
    <div style={{ padding: '5rem' }}>
      <ThemeProvider>
        <C.Row>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              id="date-picker-dialog"
              label="Start date"
              format="DD-MM-YYYY"
              value={startDate}
              onChange={handleStartDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              id="time-picker"
              ampm={false}
              minutesStep={5}
              label="Start time"
              value={startDate}
              onChange={handleStartDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
        </C.Row>
        <C.Row>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker

              id="date-picker-dialog"
              label="End date"
              format="DD-MM-YYYY"
              value={endDate}
              onChange={handleEndDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              id="time-picker"
              ampm={false}
              minutesStep={5}
              label="End time"
              value={endDate}
              onChange={handleEndDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
        </C.Row>
        <C.Row>
          <FormControl>
            <InputLabel id="repeat-select-label">Repeat</InputLabel>
            <Select
              labelId="repeat-select-label"
              id="repeat-select"
              value={repeat}
              onChange={(event) => {
                setRepeat(event.target.value);
              }}
            >
              <MenuItem value="never">Never</MenuItem>
              <MenuItem value="month">Monthly</MenuItem>
              <MenuItem value="week">Weekly</MenuItem>
              <MenuItem value="custom">Custom</MenuItem>
            </Select>
          </FormControl>
        </C.Row>

        <RepeatWeek
          repeat={repeat}
          everyWeek={everyWeek}
          weekDaysRepeat={weekDaysRepeat}
          onChange={(event) => {
            const { value } = event.target;
            const parsedValue = Math.max(0, Math.min(5, value));

            if (value === '') {
              setEveryWeek('');
            } else {
              setEveryWeek(parsedValue);
            }
          }}
          onChangeTimes={(day) => {
            if (weekDaysRepeat.includes(day)) {
              const newWeekDaysRepeat = weekDaysRepeat.filter((d) => d !== day);
              setWeekDaysRepeat(newWeekDaysRepeat);
            } else {
              setWeekDaysRepeat([...weekDaysRepeat, day]);
            }
          }}
        />

        <RepeatMonth
          repeat={repeat}
          everyMonth={everyMonth}
          monthDaysRepeat={monthDaysRepeat}
          onChange={(event) => {
            const { value } = event.target;
            const parsedValue = Math.max(1, Math.min(12, value));
            if (value === '') {
              setEveryMonth('');
            } else {
              setEveryMonth(parsedValue);
            }
          }}
          onChangeTimes={(date) => {
            if (monthDaysRepeat.includes(date)) {
              const newmonthDaysRepeat = monthDaysRepeat.filter((d) => d !== date);
              setMonthDaysRepeat(newmonthDaysRepeat);
            } else {
              setMonthDaysRepeat([...monthDaysRepeat, date]);
            }
          }}
        />

        { repeat === 'custom' && (
        <C.Row>
          <TextField
            label="Cron Expression"
            value={cronExpression}
            onChange={(event) => {
              const { value } = event.target;
              setCronExpression(value);
            }}
          />
        </C.Row>
        )}

        <RepeatEndDate
          repeat={repeat}
          endRepeatDate={endRepeatDate}
          onChange={(date) => {
            setEndRepeatDate(date);
          }}
        />

      </ThemeProvider>
      <RepeatOutput repeat={repeat} cronExpression={cronExpression} />
    </div>
  );
};

CronEditor.propTypes = propTypes;
CronEditor.defaultProps = defaultProps;
CronEditor.displayName = '@asurgent.ui.CronEditor';

export default CronEditor;
