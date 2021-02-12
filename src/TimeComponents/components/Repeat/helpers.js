import { newMoment } from '../../../Moment/momentParsers';

export const getProgress = (startDate, endDate) => {
  const diffStartEnd = newMoment(endDate).diff(newMoment(startDate), 'seconds');
  const diffNowEnd = newMoment(endDate).diff(newMoment(), 'seconds');
  const percentage = ((diffStartEnd - diffNowEnd) / diffStartEnd) * 100;

  return Math.max(0, Math.min(percentage, 100));
};
