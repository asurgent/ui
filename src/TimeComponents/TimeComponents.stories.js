/* eslint-disable camelcase */
import React from 'react';
import {
  withKnobs, number, text, boolean,
} from '@storybook/addon-knobs';

import DateSpan from './components/DateSpan';
import Repeat from './components/Repeat';
import StartEnd from './components/StartEnd';

import * as apiResponse from './apiResponses';

export default { title: 'UI Components|Time Components', decorators: [withKnobs] };

export const dateSpan = () => (
  <div style={{ padding: '2rem' }}>
    <DateSpan
      startDate={text('start date', apiResponse.ongoingBusinessHours.start)}
      endDate={text('end date', apiResponse.ongoingBusinessHours.end)}
      hasExpired={boolean('Has expired', apiResponse.ongoingBusinessHours.dyn_is_passed)}
    />
  </div>
);

dateSpan.story = {
  name: 'Date Span',
};

export const repeat = () => (
  <div style={{ padding: '2rem' }}>
    <Repeat
      startDate={text('start date', apiResponse.ongoingBusinessHours.start)}
      endDate={text('end date', apiResponse.ongoingBusinessHours.end)}
      isOngoing={boolean('Is ongoing', apiResponse.ongoingBusinessHours.dyn_is_ongoing_now)}
      hasExpired={boolean('Has expired', apiResponse.ongoingBusinessHours.dyn_is_passed)}
      cronExpression={text('cron exp', apiResponse.ongoingBusinessHours.cron_expression)}
      nextDate={text('Next date', apiResponse.ongoingBusinessHours.dyn_next_execution)}
      onGoingFrom={text('Ongoing from', apiResponse.ongoingBusinessHours.dyn_is_ongoing_from)}
      onGoingTo={text('Ongoing to', apiResponse.ongoingBusinessHours.dyn_is_ongoing_to)}
      useAnimation={boolean('Use animation', true)}
      showPercentage={boolean('Show percentage', true)}
    />
  </div>
);

repeat.story = {
  name: 'Repeat',
};

export const startEnd = () => (
  <div style={{ padding: '2rem' }}>
    <StartEnd
      isOngoing={boolean('Is ongoing', apiResponse.upcomingNextFullHour.dyn_is_ongoing_now)}
      hasExpired={boolean('Has expired', apiResponse.upcomingNextFullHour.dyn_is_passed)}
      durationInSeconds={number('Duration in seconds', apiResponse.upcomingNextFullHour.duration_in_seconds)}
      cronExpression={text('cron exp', apiResponse.upcomingNextFullHour.cron_expression)}
      nextDate={text('Next date', apiResponse.upcomingNextFullHour.dyn_next_execution)}
      onGoingFrom={text('Ongoing from', apiResponse.upcomingNextFullHour.dyn_is_ongoing_from)}
      onGoingTo={text('Ongoing to', apiResponse.upcomingNextFullHour.dyn_is_ongoing_to)}
    />
  </div>
);

startEnd.story = {
  name: 'Starts/Ends',
};
