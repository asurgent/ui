import moment from 'moment';

export const getTimestamp = (durationInSeconds, previousOccasion, isRunning) => {
  const prevEnd = moment(previousOccasion).add(durationInSeconds, 'seconds');
  const diffToPrev = moment.duration(prevEnd.diff(moment()));

  const duration = isRunning ? diffToPrev : moment.duration(durationInSeconds, 's');

  if (duration.asMinutes() < 1) {
    return { number: duration.seconds(), description: 'seconds' };
  }
  if (duration.asHours() < 1) {
    const hasSeconds = duration.seconds() !== 0;
    return {
      number: hasSeconds
        ? `${duration.minutes()}m${duration.seconds()}`
        : duration.minutes(),
      description: hasSeconds ? 'seconds' : 'minutes',
    };
  }
  if (duration.asDays() < 1) {
    const hasMinutes = duration.minutes() !== 0;
    return {
      number: hasMinutes
        ? `${duration.hours()}h${duration.minutes()}` : duration.hours(),
      description: hasMinutes ? 'minutes' : 'hours',
    };
  }
  return { number: duration.days(), description: 'days' };
};
