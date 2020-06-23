import React from 'react';
import { withKnobs, number, text } from '@storybook/addon-knobs';
import moment from 'moment';
import NextDate from './components/NextDate';
import DateSpan from './components/DateSpan';
import Repeat from './components/Repeat';
import Duration from './components/Duration';
import StartEnd from './components/StartEnd';

export default { title: 'UI Components|Time Components', decorators: [withKnobs] };

export const nextDate = () => (
  <div style={{ padding: '2rem' }}>
    <NextDate
      endDate={text('end date', moment().add(1, 'week').toString())}
      cronExpression={text('cron exp', `0 ${moment().hours()} * * *`)}
      durationInSeconds={number('duration in seconds', 1800)}
    />
  </div>
);

nextDate.story = {
  name: 'Next Date',
};

export const duration = () => (
  <div style={{ padding: '2rem' }}>
    <Duration
      endDate={text('end date', moment().add(1, 'week').toString())}
      cronExpression={text('cron exp', `0 ${moment().hours()} * * *`)}
      durationInSeconds={number('duration in seconds', 1800)}
    />
  </div>
);

duration.story = {
  name: 'Duration',
};

export const dateSpan = () => (
  <div style={{ padding: '2rem' }}>
    <DateSpan
      startDate={text('start date', moment().subtract(1, 'week').toString())}
      endDate={text('end date', moment().add(1, 'week').toString())}
      endDateThreshold={text('"Never"-threshold', moment().add(1, 'year').toString())}
    />
  </div>
);

dateSpan.story = {
  name: 'Date Span',
};
export const repeat = () => (
  <div style={{ padding: '2rem' }}>
    <Repeat
      endDate={text('end date', moment().add(1, 'week').toString())}
      cronExpression={text('cron exp', `0 ${moment().hours()} * * *`)}
    />
  </div>
);

repeat.story = {
  name: 'Repeat',
};

export const startEnd = () => (
  <div style={{ padding: '2rem' }}>
    <StartEnd
      endDate={text('end date', moment().add(1, 'week').toString())}
      cronExpression={text('cron exp', `0 16 * * *`)}
      durationInSeconds={number('duration in seconds', 1800)}
    />
  </div>
);

startEnd.story = {
  name: 'Starts/Ends',
};
