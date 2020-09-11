import moment from 'moment';
import { newMoment } from '../../../Moment/momentParsers';

export const getProgress = (startDate, endDate) => {
  const diffStartEnd = newMoment(endDate).diff(newMoment(startDate), 'seconds');
  const diffNowEnd = newMoment(endDate).diff(newMoment(), 'seconds');
  const percentage = ((diffStartEnd - diffNowEnd) / diffStartEnd) * 100;
  return percentage;
};

export const getRepeatInterval = (date1, date2) => {
  const difference = newMoment(date2).diff(date1, 'seconds');
  const momentDuration = moment.duration(difference, 'seconds');
  if (momentDuration.asDays() >= 365) {
    return { short: 'yearShort', long: 'yearLong' };
  }
  if (momentDuration.asDays() >= 28) {
    return { short: 'monthShort', long: 'monthLong' };
  }
  if (momentDuration.asDays() >= 7) {
    return { short: 'weekShort', long: 'weekLong' };
  }
  if (momentDuration.asDays() >= 1) {
    return { short: 'dayShort', long: 'dayLong' };
  }
  if (momentDuration.asHours() >= 1) {
    return { short: 'hourShort', long: 'hourLong' };
  }
  if (momentDuration.asMinutes() >= 1) {
    return { short: 'minuteShort', long: 'minuteLong' };
  }
  if (momentDuration.asSeconds() >= 1) {
    return { short: 'secondShort', long: 'secondLong' };
  }
  return { short: 'naIcon', long: 'naText' };
};
