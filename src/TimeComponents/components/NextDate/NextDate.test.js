/* eslint-env jest */

import React from 'react';
import moment from 'moment';
import { render, cleanup } from 'test-utils';
import NextDate from './index';

afterEach(cleanup);

describe('NextDate', () => {
  test('Renders invalid cron', () => {
    const props = {
      endDate: moment().add(1, 'year'),
      cronExpression: '0 y * * *',
      durationInSeconds: 3600,
    };
    const { queryByTestId } = render(<NextDate {...props} />);

    const expired = queryByTestId(/invalid-cron/);
    expect(expired).toBeDefined();
  });

  test('Renders expired', () => {
    const props = {
      endDate: moment().subtract(2, 'days'),
      cronExpression: '* 1 * * *',
      durationInSeconds: 1234,
    };

    const { queryByTestId } = render(<NextDate {...props} />);

    const expired = queryByTestId(/expired/);
    expect(expired).toBeDefined();
  });

  test('Renders ongoing', () => {
    const d = moment().set({
      hour: 15, minute: 0, second: 0, millisecond: 0,
    });

    const props = {
      currentDate: d,
      endDate: moment().add(1, 'year'),
      cronExpression: `0 ${d.hours()} * * *`,
      durationInSeconds: 1800, // 30 minutes
    };

    const { queryByTestId } = render(<NextDate {...props} />);

    const expired = queryByTestId(/isRunning/);
    expect(expired).toBeDefined();
  });

  test('Renders nextRun', () => {
    const d = moment().set({
      hour: 15, minute: 50, second: 0, millisecond: 0,
    });

    const props = {
      currentDate: d,
      endDate: moment().add(1, 'year'),
      cronExpression: `0 ${d.hours()} * * *`,
      durationInSeconds: 1800, // 30 minutes
    };

    const { queryByTestId } = render(<NextDate {...props} />);

    const expired = queryByTestId(/nextRun/);
    expect(expired).toBeDefined();
  });
});
