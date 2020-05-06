import { useState, useEffect } from 'react';
import moment from 'moment';
import { validateToString } from './helpers';
import { weekList } from './components/RepeatWeek';


const REPEAT_NEVER = 'never';
const REPEAT_MONTH = 'month';
const REPEAT_WEEK = 'week';
const REPEAT_CUSTOM = 'custom';

const END_REPEAT_NEVER = 'never';
const END_REPEAT_DATE = 'date';

const useFormBuilder = ({
  onChange,
  ...props
}) => {
  const [isReady, setIsReady] = useState(false);
  const [cronExpression, setCronExpression] = useState('');

  const [startDate, setStartDate] = useState(moment().local());
  const [endDate, setEndDate] = useState(moment().local());
  const [endRepeatDate, setEndRepeatDate] = useState(moment().local());

  const [repeat, setRepeat] = useState(REPEAT_NEVER);
  const [endRepeat, setEndRepeat] = useState(END_REPEAT_NEVER);
  const [everyWeek, setEveryWeek] = useState(1);
  const [everyMonth, setEveryMonth] = useState(1);

  const [weekDayRepeat, setWeekDayRepeat] = useState('MON');
  const [monthDaysRepeat, setMonthDaysRepeat] = useState([]);

  useEffect(() => {
    const {
      end,
      start,
      duration,
      expression,
    } = props;

    setStartDate(moment(start).local());

    const newEnd = moment(end);
    newEnd.add(duration, 'seconds');
    setEndDate(newEnd.local());
    setEndRepeatDate(moment(start).local());

    if (expression.length > 0) {
      setCronExpression(expression);
      setRepeat(REPEAT_CUSTOM);
    }

    const cronList = expression.split(' ');
    if (cronList.length === 6) {
      cronList.pop();
    }

    const [, , days, month, weeek] = cronList;

    if (month) {
      const [, repeatEveryMonth] = month.split('/');
      setEveryMonth(parseInt((repeatEveryMonth || 1), 10));
    }

    if (days && days !== '*' && days.split(',').length > 0) {
      setMonthDaysRepeat(days.split(',').map((i) => parseInt(i, 10)));
    }

    if (weeek) {
      const [weekDay, repeatEveryWeek] = weeek.split('#');
      setEveryWeek(parseInt((repeatEveryWeek || 1), 10));
      if (weekDay && weekDay !== '*' && (Number.isInteger(parseInt(weekDay, 10)) || weekDay.length === 3)) {
        if (Number.isInteger(parseInt(weekDay, 10))) {
          setWeekDayRepeat(weekList[parseInt(weekDay, 10)]);
        } else {
          setWeekDayRepeat(weekDay);
        }
      }
    }
    setIsReady(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (startDate) {
      const hours = startDate.hours();
      const minutes = startDate.minutes();
      if (repeat === 'month') {
        const days = monthDaysRepeat.join(',') || '*';
        const times = everyMonth > 0 ? `/${everyMonth}` : '';

        setCronExpression(`${minutes} ${hours} ${days} *${times} *`);
      } else if (repeat === 'week') {
        const times = everyWeek > 0 ? `#${everyWeek}` : '';

        setCronExpression(`${minutes} ${hours} * * ${weekDayRepeat}${times}`);
      }
    }
  }, [
    startDate,
    endDate,
    weekDayRepeat,
    everyMonth,
    everyWeek,
    monthDaysRepeat,
    repeat,
  ]);

  useEffect(() => {
    if (isReady) {
      const payload = {
        start: moment(startDate).utc().toISOString(),
        end: null,
        cron_expression: cronExpression,
        duration_in_seconds: endDate.diff(startDate, 'seconds'),
        valid: true,
      };

      if (endRepeat !== REPEAT_NEVER) {
        Object.assign(payload, {
          end: moment(endRepeatDate).utc().toISOString(),
          valid: Boolean(validateToString(cronExpression)),
        });
      }
      onChange(payload);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isReady,
    cronExpression,
    endDate,
    endRepeatDate,
    startDate,
    endRepeat,
  ]);

  return {
    isRepeatCustom: () => repeat === REPEAT_CUSTOM,
    isRepeatNever: () => repeat === REPEAT_NEVER,
    isRepeatMonth: () => repeat === REPEAT_MONTH,
    isRepeatWeek: () => repeat === REPEAT_WEEK,
    isEndRepeatDate: () => endRepeat === END_REPEAT_DATE,
    getRepeatTypes: () => {
      const repeatTypes = [
        REPEAT_NEVER,
        REPEAT_MONTH,
        REPEAT_WEEK,
        REPEAT_CUSTOM,
      ];
      return repeatTypes;
    },
    getEndRepeatTypes: () => {
      const repeatTypes = [
        END_REPEAT_NEVER,
        END_REPEAT_DATE,
      ];
      return repeatTypes;
    },
    getStartDate: () => startDate,
    getEndDate: () => endDate,
    getRepeat: () => repeat,
    getExpression: () => cronExpression,
    getEveryMonth: () => everyMonth,
    getMonthDaysRepeat: () => monthDaysRepeat,
    getEndRepeatDate: () => endRepeatDate,
    getEndRepeat: () => endRepeat,
    getWeekDayRepeat: () => weekDayRepeat,
    getEveryWeek: () => everyWeek,
    handleEveryWeek: (event) => {
      const { value } = event.target;
      const parsedValue = Math.max(0, Math.min(5, value));

      if (value === '') {
        setEveryWeek('');
      } else {
        setEveryWeek(parsedValue);
      }
    },
    handleWeekDayRepeat: (day) => {
      setWeekDayRepeat(day);
    },
    handleEndRepeat: ({ target }) => {
      if (target.value === END_REPEAT_DATE) {
        if (endRepeatDate <= endDate) {
          setEndRepeatDate(moment(endDate).local());
        }
      }
      setEndRepeat(target.value);
    },
    handleEndRepeatDate: (date) => {
      if (date) {
        if (date <= endDate) {
          setEndRepeatDate(moment(endDate).local());
        } else {
          setEndRepeatDate(moment(date).local());
        }
      } else {
        setEndRepeatDate(date);
      }
    },
    handleMonthDaysRepeat: (date) => {
      if (monthDaysRepeat.includes(date)) {
        const newmonthDaysRepeat = monthDaysRepeat.filter((d) => d !== date);
        setMonthDaysRepeat(newmonthDaysRepeat);
      } else {
        setMonthDaysRepeat([...monthDaysRepeat, date]);
      }
    },
    handleEveryMonthChange: (event) => {
      const { value } = event.target;
      const parsedValue = Math.max(1, Math.min(12, value));
      if (value === '') {
        setEveryMonth('');
      } else {
        setEveryMonth(parsedValue);
      }
    },
    handleExpressionChange: (event) => {
      const { value } = event.target;
      setCronExpression(value);
    },
    handleRepeatChange: (event) => {
      const { value } = event.target;
      setRepeat(value);
    },
    handleStartDateChange: (date) => {
      if (date) {
        setStartDate(date.local());

        if (date >= endDate) {
          setEndDate(date.local());
        }
      } else {
        setStartDate(date);
      }
    },

    handleEndDateChange: (date) => {
      if (date) {
        if (date >= startDate) {
          setEndDate(date.local());
        }
        if (date >= endRepeatDate) {
          setEndRepeatDate(date.local());
        }
      } else {
        setEndDate(date);
      }
    },
  };
};

export default useFormBuilder;
