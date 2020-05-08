import { useState, useEffect } from 'react';
import moment from 'moment';
import { validateToString } from './helpers';

const OCCURRENCES_FOREVER = 'never';
const OCCURRENCES_UNTILL_DATE = 'date';
const OCCURRENCES_ONCE = 'once';

const DURATION_DAYS = 'days';
const DURATION_HOURS = 'hours';
const DURATION_MINUTES = 'minutes';

const REPEAT_DAY = 'day';
const REPEAT_WEEK = 'week';
const REPEAT_MONTH = 'month';
const REPEAT_CUSTOM = 'custom';

const useFormBuilder = ({
  onChange,
  ...props
}) => {
  const [isReady, setIsReady] = useState(false);


  const [startDate, setStartDate] = useState(moment().local());
  const [endDate, setEndDate] = useState(moment().local());
  const [duration, setDuration] = useState(60);
  const [durationType, setDurationType] = useState(DURATION_MINUTES);
  const [occurrence, setOccurrence] = useState(OCCURRENCES_ONCE);
  const [repeatType, setRepeatType] = useState(REPEAT_WEEK);
  const [cronExpression, setCronExpression] = useState('');

  useEffect(() => {
    const {
      end,
      start,
      duration: durationInSeconds,
      expression,
    } = props;

    setStartDate(moment(start).local());

    const newEnd = moment(end);
    setDuration(durationInSeconds);
    setEndDate(newEnd.local());

    if (expression.length > 0) {
      setCronExpression(expression);
    }

    setIsReady(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const hours = startDate.hours();
    const minutes = startDate.minutes();
    const weekday = startDate.weekday();
    const dayOfMonth = startDate.date();

    if (repeatType === REPEAT_DAY) {
      setCronExpression(`${minutes} ${hours} * * *`);
    } else if (repeatType === REPEAT_WEEK) {
      setCronExpression(`${minutes} ${hours} * * ${weekday}`);
    } else if (repeatType === REPEAT_MONTH) {
      setCronExpression(`${minutes} ${hours} ${dayOfMonth} * *`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repeatType]);

  useEffect(() => {
    if (isReady) {
      const payload = {
        start: moment(startDate).utc().toISOString(),
        end: moment(endDate).utc().toISOString(),
        cron_expression: cronExpression,
        duration_in_seconds: 0,
        valid: Boolean(validateToString(cronExpression)),
      };

      if (durationType === DURATION_MINUTES) {
        Object.assign(payload, { duration_in_seconds: duration * 60 });
      } else if (durationType === DURATION_HOURS) {
        Object.assign(payload, { duration_in_seconds: duration * 60 * 60 });
      } else if (durationType === DURATION_DAYS) {
        Object.assign(payload, { duration_in_seconds: duration * 60 * 60 * 24 });
      }
      console.log(payload);

      onChange(payload);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isReady,
    duration,
    cronExpression,
    durationType,
    endDate,
    startDate,
    occurrence,
  ]);

  return {
    willRunMoreThanOnce: () => occurrence !== OCCURRENCES_ONCE,
    customRepeat: () => repeatType === REPEAT_CUSTOM,
    willEndOnDate: () => occurrence === OCCURRENCES_UNTILL_DATE,
    getOccurrenceTypesList: () => {
      const occurrenceTypes = [
        OCCURRENCES_ONCE,
        OCCURRENCES_UNTILL_DATE,
        OCCURRENCES_FOREVER,
      ];
      return occurrenceTypes;
    },
    getDurationTypesList: () => {
      const durationTypes = [
        DURATION_MINUTES,
        DURATION_HOURS,
        DURATION_DAYS,
      ];
      return durationTypes;
    },
    getRepeatTypesList: () => {
      const durationTypes = [
        REPEAT_DAY,
        REPEAT_WEEK,
        REPEAT_MONTH,
        REPEAT_CUSTOM,
      ];
      return durationTypes;
    },
    getDuration: () => duration,
    getDurationType: () => durationType,
    getStartDate: () => startDate,
    getEndDate: () => endDate,
    getExpression: () => cronExpression,
    getRepeatType: () => repeatType,
    getOccurrence: () => occurrence,
    handleOccurrence: ({ target }) => {
      if (target.value === OCCURRENCES_UNTILL_DATE) {
        setEndDate(moment().local());
      } else if (target.value === OCCURRENCES_FOREVER) {
        setEndDate(moment('9999-12-30 23:39:59').local());
      } else {
        setEndDate(moment().local());
      }

      setOccurrence(target.value);
    },
    handleExpressionChange: (event) => {
      const { value } = event.target;
      setCronExpression(value);
    },
    handleRepeatChange: (event) => {
      const { value } = event.target;

      setRepeatType(value);
    },
    handleDurationTypeChange: (event) => {
      const { value } = event.target;
      setDurationType(value);
    },
    handleDurationChange: (event) => {
      const { value } = event.target;
      setDuration(value);
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
      } else {
        setEndDate(date);
      }
    },
  };
};

export default useFormBuilder;
