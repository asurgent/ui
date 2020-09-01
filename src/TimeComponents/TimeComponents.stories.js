/* eslint-disable camelcase */
import React from 'react';
import {
  withKnobs, number, text, boolean,
} from '@storybook/addon-knobs';
import moment from 'moment';
import NextDate from './components/NextDate';
import DateSpan from './components/DateSpan';
import Repeat from './components/Repeat';
import Duration from './components/Duration';
import StartEnd from './components/StartEnd';
import DateAndTime from './components/DateAndTime';

export default { title: 'UI Components|Time Components', decorators: [withKnobs] };
const apiResponse = {
  reason: 'Testing to create a new serviceWindow',
  entity_ids: [
    '7AF1F96B4306D4EFA5CAB923F4A25C21DAB87AFC',
  ],
  entity_names: [
    'co-agent-test01 (7AF1F96B4306D4EFA5CAB923F4A25C21DAB87AFC)',
  ],
  enabled: true,
  ticket_id_external: 'https://github.com/asurgent/admin/issues/224',
  modified: '2020-02-26T15:18:29.334Z',
  requested_by: 'ellinor.wilhelmsson@asurgent.se',
  start: '2020-12-03T07:00:00Z',
  end: '2020-12-03T07:00:00Z',
  cron_expression: '* * * * * *',
  duration_in_seconds: 10000,
  dyn_is_passed: false,
  dyn_next_execution: '2020-12-03T07:00:00Z',
  dyn_is_ongoing_now: false,
  dyn_is_ongoing_from: null,
  dyn_is_ongoing_to: null,
  temp_ticket_id: 'cfdd233e-0cac-4821-a213-f0e7874fe333',
  id: '8D6A8C78A7BEFA22ECC6AC5F43499BC3C89F156C',
  customer_id: '3688',
  customer_name: 'Imagine DLX AB',
  customer_display_name: 'Imagine DLX AB (3688)',
};

export const nextDate = () => (
  <div style={{ padding: '2rem' }}>
    <NextDate
      cronExpression={text('cron exp', `0 ${moment().hours()} * * *`)}
      isOngoing={boolean('Is ongoing', true)}
      nextDate={text('Next date', moment().add(1, 'hours').toString())}
      hasExpired={boolean('Has expired', true)}
    />
  </div>
);

nextDate.story = {
  name: 'Next Date',
};

export const dateAndTime = () => {
  const {
    dyn_is_ongoing_now,
    dyn_next_execution,
    dyn_is_passed,
    cron_expression,
  } = apiResponse;
  return (
    <div style={{ padding: '2rem' }}>
      <DateAndTime date={moment()} />
    </div>
  );
};

dateAndTime.story = {
  name: 'Date and Time',
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
      isOngoing={boolean('Is ongoing', true)}
      hasExpired={boolean('Has expired', true)}
      durationInSeconds={number('Duration in seconds', 1800)}
      cronExpression={text('cron exp', `0 ${moment().hours()} * * *`)}
      nextDate={text('Next date', moment().add(4, 'days').toString())}
      onGoingFrom={text('Ongoing from', moment().toString())}
      onGoingTo={text('Ongoing to', moment().add(30, 'minutes').toString())}
    />
  </div>
);

startEnd.story = {
  name: 'Starts/Ends',
};
