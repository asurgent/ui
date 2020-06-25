import moment from 'moment';

export const getRepeatInterval = (duration) => {
  const momentDuration = moment.duration(duration, 'seconds');
  if (momentDuration.years()) {
    return { short: 'yearShort', long: 'yearLong' };
  }
  if (momentDuration.asDays() >= 30) {
    return { short: 'monthShort', long: 'monthLong' };
  }
  if (momentDuration.weeks()) {
    return { short: 'weekShort', long: 'weekLong' };
  }
  if (momentDuration.days()) {
    return { short: 'dayShort', long: 'dayLong' };
  }
  if (momentDuration.hours()) {
    return { short: 'hourShort', long: 'hourLong' };
  }
  if (momentDuration.minutes()) {
    return { short: 'minuteShort', long: 'minuteLong' };
  }
  if (momentDuration.seconds()) {
    return { short: 'secondShort', long: 'secondLong' };
  }
  return { short: 'naIcon', long: 'naText' };
};
