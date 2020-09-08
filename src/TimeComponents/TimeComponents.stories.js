/* eslint-disable camelcase */
import React from 'react';
import {
  withKnobs, text, boolean,
} from '@storybook/addon-knobs';

import DateSpan from './components/DateSpan';
import Repeat from './components/Repeat';
import StartEnd from './components/StartEnd';

import { newMoment } from '../Moment/momentParsers';

export default { title: 'UI Components|Time Components', decorators: [withKnobs] };

export const dateSpan = () => (
  <div style={{ padding: '2rem' }}>
    <DateSpan
      startDate={text('start date', newMoment()
        .subtract(123, 'days')
        .set({ hour: 8, minute: 25 })
        .toISOString())}
      endDate={text('end date', newMoment()
        .add(45, 'days')
        .set({ hour: 19, minute: 11 })
        .toISOString())}
      hasExpired={boolean('Has expired', false)}
    />
  </div>
);

dateSpan.story = {
  name: 'Date Span',
};

export const repeat = () => (
  <div style={{ padding: '2rem' }}>
    <Repeat
      isOngoing={boolean('Is ongoing', true)}
      hasExpired={boolean('Has expired', false)}
      cronExpression={text('cron exp', `0 ${newMoment().hours() + 1} * * *`)}
      nextExecution={text('Next execution', newMoment().set({
        hours: newMoment().hours() + 1, minutes: 0, seconds: 0, milliseconds: 0,
      }))}
      onGoingFrom={text('Ongoing from', newMoment().set({
        hours: newMoment().hours(), minutes: 0, seconds: 0, milliseconds: 0,
      }))}
      onGoingTo={text('Ongoing to', newMoment().set({
        hours: newMoment().hours() + 1, minutes: 0, seconds: 0, milliseconds: 0,
      }))}
      useAnimation={boolean('Use animation', true)}
      showPercentage={boolean('Show percentage', true)}
    />
  </div>
);

repeat.story = {
  name: 'Repeat',
};

export const startEnd = () => {
  const duration = 3600;
  const currentHour = newMoment().hours();
  const from = newMoment().set({
    hour: currentHour, minute: 0, second: 0, millisecond: 0,
  });

  const to = from.clone().add(3600, 'seconds').toISOString();
  const next = from.clone().add(1, 'days').toISOString();

  return (
    <div style={{ padding: '2rem' }}>
      <StartEnd
        isOngoing={boolean('Is ongoing', true)}
        hasExpired={boolean('Has expired', false)}
        cronExpression={text('cron exp', `0 ${currentHour} * * *`)}
        durationInSeconds={duration}
        nextDate={text('Next date', next)}
        onGoingFrom={text('Ongoing from', from.toISOString())}
        onGoingTo={text('Ongoing to', to)}
      />
    </div>
  );
};

startEnd.story = {
  name: 'Starts/Ends',
};
