import cronstrue from 'cronstrue';
import Cron from 'cron-converter';
import moment from 'moment';

export const getNextExecutionList = (expression, startDate) => {
  try {
    const cronInstance = new Cron();
    cronInstance.fromString(expression);
    const interval = cronInstance.schedule(moment(startDate).local());

    return Array.from({ length: 3 }, () => {
      try {
        return interval.next().format();
      } catch (e) {
        return null;
      }
    });
  } catch (e) {
    return [];
  }
};

export const validateToString = (expression) => {
  try {
    return cronstrue.toString(expression, { use24HourTimeFormat: true });
  } catch (e) {
    return false;
  }
};
