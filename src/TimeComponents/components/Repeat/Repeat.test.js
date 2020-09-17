/* eslint-env jest */

import React from 'react';
import { render, cleanup } from 'test-utils';
import Repeat from './index';
import { newMoment } from '../../../Moment/momentParsers';

afterEach(cleanup);

const startOfDay = newMoment()
  .set({
    hours: 6,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  })
  .toISOString();

const endOfDay = newMoment()
  .set({
    hours: 22,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  })
  .toISOString();

const nextYear = newMoment()
  .set({
    hours: 6,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  })
  .add(1, 'year')
  .toISOString();

const startOfHour = newMoment()
  .set({
    hours: newMoment().hours(),
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  })
  .toISOString();

const startOfNextHour = newMoment()
  .set({
    hours: newMoment().hours() + 1,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  })
  .toISOString();

// unused parts of the api-reply are stripped
const ongoingProps = {
  startDate: startOfDay,
  endDate: endOfDay,
  cronExpression: null,
  hasExpired: false,
  isOngoing: true,
  onGoingFrom: startOfHour,
  onGoingTo: startOfNextHour,
};

const expiredProps = {
  startDate: newMoment().subtract(2, 'days').toISOString(),
  endDate: newMoment().subtract(1, 'days').toISOString(),
  cronExpression: '21 14 * * *',
  hasExpired: true,
  isOngoing: false,
  onGoingFrom: null,
  onGoingTo: null,
};

const repeatingProps = {
  startDate: startOfDay,
  endDate: nextYear,
  cronCategory: 'custom',
  hasExpired: false,
  isOngoing: false,
  onGoingFrom: null,
  onGoingTo: null,
  nextExecution: startOfNextHour,
};

describe('Repeat', () => {
  test('Renders progress', async () => {
    const { getByTestId } = render(<Repeat {...ongoingProps} />);

    const progress = getByTestId(/progress/);
    expect(progress).toBeDefined();
  });
  test('Renders expired', async () => {
    const { getByTestId } = render(<Repeat {...expiredProps} />);

    const hour = getByTestId(/expired/);
    expect(hour).toBeDefined();
  });

  test('Renders repeats', async () => {
    const { getByTestId } = render(<Repeat {...repeatingProps} />);

    const repeats = getByTestId(/repeats/);
    expect(repeats).toBeDefined();
  });
});
