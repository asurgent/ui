/* eslint-disable camelcase */
import React from 'react';
import {
  withKnobs, number, text, boolean,
} from '@storybook/addon-knobs';

import DateSpan from './components/DateSpan';
import Repeat from './components/Repeat';
import StartEnd from './components/StartEnd';

import { apiResponseUpcoming, apiResponseOngoing } from './apiResponses';

export default { title: 'UI Components|Time Components', decorators: [withKnobs] };

export const dateSpan = () => (
  <div style={{ padding: '2rem' }}>
    <DateSpan
      startDate={text('start date', apiResponseOngoing.start)}
      endDate={text('end date', apiResponseOngoing.end)}
      hasExpired={boolean('Has expired', apiResponseOngoing.dyn_is_passed)}
    />
  </div>
);

dateSpan.story = {
  name: 'Date Span',
};

export const repeat = () => (
  <div style={{ padding: '2rem' }}>
    <Repeat
      isOngoing={boolean('Is ongoing', apiResponseOngoing.dyn_is_ongoing_now)}
      hasExpired={boolean('Has expired', apiResponseOngoing.dyn_is_passed)}
      cronExpression={text('cron exp', apiResponseOngoing.cron_expression)}
      nextDate={text('Next date', apiResponseOngoing.dyn_next_execution)}
    />
  </div>
);

repeat.story = {
  name: 'Repeat',
};

export const startEnd = () => (
  <div style={{ padding: '2rem' }}>
    <StartEnd
      isOngoing={boolean('Is ongoing', apiResponseUpcoming.dyn_is_ongoing_now)}
      hasExpired={boolean('Has expired', apiResponseUpcoming.dyn_is_passed)}
      durationInSeconds={number('Duration in seconds', apiResponseUpcoming.duration_in_seconds)}
      cronExpression={text('cron exp', apiResponseUpcoming.cron_expression)}
      nextDate={text('Next date', apiResponseUpcoming.dyn_next_execution)}
      onGoingFrom={text('Ongoing from', apiResponseUpcoming.dyn_is_ongoing_from)}
      onGoingTo={text('Ongoing to', apiResponseUpcoming.dyn_is_ongoing_to)}
    />
  </div>
);

startEnd.story = {
  name: 'Starts/Ends',
};
