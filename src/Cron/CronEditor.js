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
  const [isReady, setIsReady] = useState(false);
  const [cronExpression, setCronExpression] = useState(expression);

  const [startDate, setStartDate] = useState(moment().local());
  const [endDate, setEndDate] = useState(moment().local());
  const [endRepeatDate, setEndRepeatDate] = useState(moment().local());

  const [repeat, setRepeat] = useState('never');
  const [everyWeek, setEveryWeek] = useState(1);
  const [everyMonth, setEveryMonth] = useState(1);

  const [weekDaysRepeat, setWeekDaysRepeat] = useState(['MON']);
  const [monthDaysRepeat, setMonthDaysRepeat] = useState([]);

  useEffect(() => {
    const newEnd = moment(start);
    newEnd.add(duration, 'seconds');

    setStartDate(moment(start).local());
    setEndDate(newEnd.local());
    setEndRepeatDate(moment(end).local());

    if (expression.length > 0) {
      setCronExpression(expression);
      setRepeat('custom');
    }

    const cronList = expression.split(' ');
    if (cronList.length === 6) {
      cronList.pop();
    }
    const [minutes, hours, days, month, weeek] = cronList;

    if (month) {
      const [_, repeatEveryMonth] = month.split('/');
      setEveryMonth(parseInt((repeatEveryMonth || 1), 10));
    }

    if (days && days !== '*' && days.split(',').length > 0) {
      setMonthDaysRepeat(days.split(',').map((i) => parseInt(i, 10)));
    }

    if (weeek) {
      const [weekDays, repeatEveryWeek] = weeek.split('#');
      setEveryWeek(parseInt((repeatEveryWeek || 1), 10));
      if (weekDays && weekDays !== '*' && weekDays.split(',').length) {
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
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      const payload = {
        start: moment(startDate).utc().toISOString(),
        end: moment(endDate).utc().toISOString(),
        cron_expression: '',
        duration_in_seconds: endDate.diff(startDate, 'seconds'),
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
    }
  }, [isReady, cronExpression]);

  useEffect(() => {
    const hours = startDate.hours();
    const minutes = startDate.minutes();
    if (repeat === 'month') {
      const days = monthDaysRepeat.join(',') || '*';
      const times = everyMonth > 0 ? `/${everyMonth}` : '';

      setCronExpression(`${minutes} ${hours} ${days} *${times} *`);
    } else if (repeat === 'week') {
      const days = weekDaysRepeat.join(',');
      const times = everyWeek > 0 ? `#${everyWeek}` : '';

      setCronExpression(`${minutes} ${hours} * * ${days}${times}`);
    }
  }, [startDate, weekDaysRepeat, everyMonth, everyWeek, monthDaysRepeat, repeat]);

  const handleStartDateChange = (date) => {
    setStartDate(date.local());

    if (date >= endDate) {
      setEndDate(date.local());
    }
  };

  const handleEndDateChange = (date) => {
    if (date >= startDate) {
      setEndDate(date.local());
    }
  };

  return (

    <C.Columns>
      <C.Editor>
        <ThemeProvider>
          <C.Row>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                label="Start date"
                format="DD-MM-YYYY"
                value={startDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardTimePicker
                ampm={false}
                type="time"
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
                label="End date"
                format="DD-MM-YYYY"
                value={endDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardTimePicker
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
      </C.Editor>
      {repeat !== 'never' && (
        <RepeatOutput withBorder repeat={repeat} cronExpression={cronExpression} startDate={startDate} />
      )}

    </C.Columns>
  );
};

CronEditor.propTypes = propTypes;
CronEditor.defaultProps = defaultProps;
CronEditor.displayName = '@asurgent.ui.CronEditor';

export default CronEditor;
