/* eslint-disable camelcase */
import React from 'react';
import {
  withKnobs, text, boolean, number,
} from '@storybook/addon-knobs';
import * as TimeComponents from './index';
import { newMoment } from '../Moment/momentParsers';

export default { title: 'UI Components|Time Components', decorators: [withKnobs] };

export const dateSpan = () => (
  <div style={{ padding: '2rem' }}>
    <TimeComponents.DateSpan
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
    <TimeComponents.Repeat
      isOngoing={boolean('Is ongoing', true)}
      hasExpired={boolean('Has expired', false)}
      cronCategory={text('Cron category', `custom`)}
      onGoingFrom={text('Ongoing from', newMoment().set({
        hours: newMoment().hours(), minutes: 0, seconds: 0, milliseconds: 0,
      }).toISOString())}
      onGoingTo={text('Ongoing to', newMoment().set({
        hours: newMoment().hours() + 1, minutes: 0, seconds: 0, milliseconds: 0,
      }).toISOString())}
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
  }).toISOString();

  const to = newMoment(from).add(duration, 'seconds').toISOString();
  const next = newMoment(from).add(1, 'days').toISOString();

  return (
    <div style={{ padding: '2rem' }}>
      <TimeComponents.StartEnd
        showDurationToolTip={boolean('Show duration tooltip', true)}
        isOngoing={boolean('Is ongoing', true)}
        hasExpired={boolean('Has expired', false)}
        durationInSeconds={number('Duration in seconds', duration)}
        cronExpression={text('cron exp', `0 ${currentHour} * * *`)}
        nextExecution={text('Next date', next)}
        onGoingFrom={text('Ongoing from', from)}
        onGoingTo={text('Ongoing to', to)}
      />
    </div>
  );
};

startEnd.story = {
  name: 'Starts/Ends',
};
