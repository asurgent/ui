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

const getDurationInSeconds = (durationType, duration) => {
  if (durationType === DURATION_MINUTES) {
    return duration * 60;
  } if (durationType === DURATION_HOURS) {
    return duration * 60 * 60;
  } if (durationType === DURATION_DAYS) {
    return duration * 60 * 60 * 24;
  }

  return 0;
};

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
    setDuration(durationInSeconds / 60);
    setDurationType(DURATION_MINUTES);
    setEndDate(newEnd.local());

    if (expression.length > 0) {
      setCronExpression(expression);
    }

    setIsReady(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (occurrence === OCCURRENCES_UNTILL_DATE) {
      const newEnd = moment(startDate);
      newEnd.second(59);
      newEnd.minutes(59);
      newEnd.hour(23);
      setEndDate(newEnd);
    } else if (occurrence === OCCURRENCES_FOREVER) {
      setEndDate(moment('9999-12-30 23:39:59').local());
    } else {
      const newEnd = moment(startDate).add(duration, durationType);
      setEndDate(newEnd.local());
    }
  }, [occurrence, startDate, durationType, duration]);

  useEffect(() => {
    const hours = startDate.hours();
    const minutes = startDate.minutes();
    const weekday = startDate.weekday();
    const dayOfMonth = startDate.date();

    if (occurrence !== OCCURRENCES_ONCE) {
      if (repeatType === REPEAT_DAY) {
        setCronExpression(`${minutes} ${hours} * * *`);
      } else if (repeatType === REPEAT_WEEK) {
        setCronExpression(`${minutes} ${hours} * * ${weekday}`);
      } else if (repeatType === REPEAT_MONTH) {
        setCronExpression(`${minutes} ${hours} ${dayOfMonth} * *`);
      } else if (repeatType === REPEAT_CUSTOM) {
        setCronExpression(`* * * * *`);
      }
    } else {
      setCronExpression('');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repeatType, startDate, occurrence]);

  useEffect(() => {
    if (isReady) {
      const payload = {
        valid: true,
        payload: {
          start: moment(startDate).utc().toISOString(),
          end: moment(endDate).utc().toISOString(),
          cron_expression: cronExpression,
          duration_in_seconds: getDurationInSeconds(durationType, duration),
        },
        meta: {
          repeatType: null,
          duration,
          durationType,
          occurrence,
        },
      };

      if (occurrence !== OCCURRENCES_ONCE) {
        Object.assign(payload, {
          valid: Boolean(validateToString(cronExpression)),
          repeatType,
        });

        Object.assign(payload.meta, {
          repeatType,
        });
      }

      onChange(payload);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isReady,
    cronExpression,
    endDate,
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
      const parsed = `${value}`.replace(/\D/g, '');
      setDuration(parsed);
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
