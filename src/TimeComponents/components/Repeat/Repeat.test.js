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

const upcomingProps = {
  start: startOfDay,
  end: endOfDay,
  cronExpression: null,
  hasExpired: false,
  isOngoing: false,
  onGoingFrom: null,
  onGoingTo: null,
};

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

describe('Duration', () => {
  test('Renders progress', async () => {
    const { getByTestId } = render(<Repeat {...ongoingProps} />);

    const minute = getByTestId(/progress/);
    expect(minute).toBeDefined();
  });
  test('Renders expired', async () => {
    const { getByTestId } = render(<Repeat {...expiredProps} />);

    const hour = getByTestId(/expired/);
    expect(hour).toBeDefined();
  });
  test('Renders upcoming', async () => {
    const { getByTestId } = render(<Repeat {...upcomingProps} />);

    const day = getByTestId(/dayShort/);
    expect(day).toBeDefined();
  });
  test('Renders week', async () => {
    const props = {
      endDate: newMoment().add(1, 'year'),
      cronExpression: '0 15 * * 1',
    };
    const { getByTestId } = render(<Repeat {...props} />);

    const week = getByTestId(/weekShort/);
    expect(week).toBeDefined();
  });
});
