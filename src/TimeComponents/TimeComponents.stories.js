/* eslint-disable camelcase */
import React from 'react';
import * as TimeComponents from './index';
import { newMoment } from '../Moment/momentParsers';

/* story variables */
const durationInSeconds = 3600;
const currentHour = newMoment().hours();
const onGoingFrom = newMoment()
  .set({
    hour: currentHour, minute: 0, second: 0, millisecond: 0,
  }).toISOString();
const onGoingTo = newMoment(onGoingFrom)
  .add(durationInSeconds, 'seconds')
  .toISOString();
const nextExecution = newMoment(onGoingFrom)
  .add(1, 'days')
  .toISOString();
/* story variables */

const Story = {
  title: 'Components/TimeComponents',
  component: TimeComponents,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};
export default Story;

const DateSpanTemplate = (args) => <TimeComponents.DateSpan {...args} />;

export const DateSpan = DateSpanTemplate.bind({});
DateSpan.args = {
  startDate: newMoment()
    .subtract(123, 'days')
    .set({ hour: 8, minute: 25 })
    .toISOString(),
  endDate: newMoment()
    .add(45, 'days')
    .set({ hour: 19, minute: 11 })
    .toISOString(),
  hasExpired: false,
};

const RepeatTemplate = (args) => <TimeComponents.Repeat {...args} />;

export const Repeat = RepeatTemplate.bind({});
Repeat.args = {
  onGoingFrom: newMoment()
    .set({ hour: 8, minute: 0 })
    .toISOString(),
  onGoingTo: newMoment()
    .add(1, 'days')
    .set({ hour: 8, minute: 0 })
    .toISOString(),
  hasExpired: false,
  isOngoing: true,
  cronCategory: 'custom',
  useAnimation: true,
  showPercentage: true,
};

const StartEndTemplate = (args) => <TimeComponents.StartEnd {...args} />;

export const StartEnd = StartEndTemplate.bind({});
StartEnd.args = {
  showDurationToolTip: true,
  isOngoing: true,
  hasExpired: false,
  durationInSeconds,
  cronExpression: `0 ${currentHour} * * *`,
  nextExecution,
  onGoingFrom,
  onGoingTo,
};
