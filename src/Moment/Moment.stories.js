
import React from 'react';
import {
  withKnobs, text, boolean, number,
} from '@storybook/addon-knobs';
import * as Moment from './index';

export default { title: 'UI Components|Moment Date', decorators: [withKnobs] };

export const fullDateTimeFormat = () => (
  <>
    <Moment.Full timestamp={text('timestamp', '2020-01-15T13:30:45')} />
  </>
);
export const dateTimeFormat = () => (
  <>
    <Moment.DateTime timestamp={text('timestamp', '2020-01-15T13:30:45+0200')} />
  </>
);
export const dateFormat = () => (
  <>
    <Moment.Date timestamp={text('timestamp', '2020-01-15T13:30:45+0200')} />
  </>
);

export const durationMoment = () => {
  const useDate = boolean('date-range', true);
  const startDate = text('timestamp start ', '2020-01-15T13:30:45+0200');
  const endDate = text('timestamp end', '2020-01-18T11:20:45+0200');
  const duration = number('duration in seconds', 15000);
  return (
    <>
      <Moment.Duration seconds={duration} start={useDate ? startDate : false} end={useDate ? endDate : false} />
    </>
  );
};

export const timeAgoFormat = () => (
  <>
    <Moment.Ago timestamp={text('timestamp', '2020-01-15T13:30:45+0200')} />
  </>
);

export const customFormat = () => (
  <>
    <Moment.Custom format={text('Time format', 'ddd MMM YYYY @ HH.mm')} timestamp={text('timestamp', '2020-01-15T13:30:45+0200')} />
  </>
);
