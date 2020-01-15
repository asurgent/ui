import moment from 'moment';

moment.defineLocale('sv', {
  relativeTime: {
    future: 'om %s',
    past: '%s sedan',
    s: 'några dekunder sedan',
    ss: '%d sekunder',
    m: 'en minut',
    mm: '%d minuter',
    h: 'en timme',
    hh: '%d timmar',
    d: 'en dag',
    dd: '%d dagar',
    M: 'en månad',
    MM: '%d månader',
    y: 'ett år',
    yy: '%d år',
  },
});

const parseTime = (timestamp) => {
  const parsed = moment
    .parseZone(timestamp);

  if (parsed.isValid()) {
    return parsed.local();
  }

  return false;
};

export const isValid = (timestamp) => moment(timestamp).isValid();

export const date = (timestamp) => {
  const time = parseTime(timestamp);
  if (time) {
    return time.format('YYYY-MM-DD');
  }
  return '';
};


export const dateTime = (timestamp) => {
  const time = parseTime(timestamp);
  if (time) {
    return time.format('YYYY-MM-DD HH:mm');
  }
  return '';
};

export const full = (timestamp) => {
  const time = parseTime(timestamp);
  if (time) {
    return time.format('YYYY-MM-DD HH:mm:ss');
  }
  return '';
};

export const ago = (timestamp) => {
  const time = parseTime(timestamp);
  if (time) {
    if (moment().diff(time, 'days') >= 6) {
      return date(timestamp);
    }

    return time.fromNow();
  }
  return '';
};

export const custom = (timestamp, formatTemplate) => {
  const time = parseTime(timestamp);
  if (time) {
    return time.format(formatTemplate);
  }
  return '';
};
