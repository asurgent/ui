/* eslint-env jest */

import React from 'react';
import moment from 'moment';
import { render, cleanup } from 'test-utils';
import NextDate from './index';

afterEach(cleanup);

describe('Duration', () => {
  test('Renders invalid cron', () => {
    const currentDate = moment().set({
      hour: 15, minute: 50, second: 0, millisecond: 0,
    });

    const props = {
      currentDate,
      endDate: moment().add(1, 'year'),
      cronExpression: '0 y * * *',
      durationInSeconds: 3600,
    };

    const { queryByTestId } = render(<NextDate {...props} />);

    const invalidCron = queryByTestId(/invalid-cron/);
    expect(invalidCron).toBeDefined();
  });

  test('Shows remaining', () => {
    // 10 minutes left
    const currentDate = moment().set({
      hour: 15, minute: 50, second: 0, millisecond: 0,
    });

    const props = {
      currentDate,
      endDate: moment().subtract(1, 'year'),
      cronExpression: `0 ${currentDate.hours()} * * *`,
      durationInSeconds: 3600,
    };

    const { queryByTestId } = render(<NextDate {...props} />);

    const remainingDuration = queryByTestId(/remaining/);
    expect(remainingDuration).toBeDefined();
  });
  test('Shows full duration', () => {
    // 30 min duration
    const currentDate = moment().set({
      hour: 15, minute: 0, second: 0, millisecond: 0,
    });

    const props = {
      currentDate,
      endDate: moment().subtract(1, 'year'),
      cronExpression: `0 ${currentDate.hours()} * * *`,
      durationInSeconds: 1800,
    };

    const { queryByTestId } = render(<NextDate {...props} />);

    const remainingDuration = queryByTestId(/duration/);
    expect(remainingDuration).toBeDefined();
  });
});
