/* eslint-env jest */

import React from 'react';
import { render, cleanup } from 'test-utils';
import * as apiResponse from '../../apiResponses';
import Repeat from './index';
import { newMoment } from '../../../Moment/momentParsers';

afterEach(cleanup);

const onGoingProps = {
  startDate: apiResponse.ongoingBusinessHours.start,
  endDate: apiResponse.ongoingBusinessHours.end,
  isOngoing: apiResponse.ongoingBusinessHours.dyn_is_ongoing_now,
  hasExpired: apiResponse.ongoingBusinessHours.dyn_is_passed,
  cronExpression: apiResponse.ongoingBusinessHours.cron_expression,
  nextDate: apiResponse.ongoingBusinessHours.dyn_next_execution,
  onGoingFrom: apiResponse.ongoingBusinessHours.dyn_is_ongoing_from,
  onGoingTo: apiResponse.ongoingBusinessHours.dyn_is_ongoing_to,
};

const expiredProps = {
  startDate: apiResponse.expired.start,
  endDate: apiResponse.expired.end,
  isOngoing: apiResponse.expired.dyn_is_ongoing_now,
  hasExpired: apiResponse.expired.dyn_is_passed,
  cronExpression: apiResponse.expired.cron_expression,
  nextDate: apiResponse.expired.dyn_next_execution,
  onGoingFrom: apiResponse.expired.dyn_is_ongoing_from,
  onGoingTo: apiResponse.expired.dyn_is_ongoing_to,
};

describe('Duration', () => {
  test('Renders progress', async () => {
    const { getByTestId } = render(<Repeat {...onGoingProps} />);

    const minute = getByTestId(/progress/);
    expect(minute).toBeDefined();
  });
  test('Renders expired', async () => {
    const { getByTestId } = render(<Repeat {...expiredProps} />);

    const hour = getByTestId(/expired/);
    expect(hour).toBeDefined();
  });
  test('Renders day', async () => {
    const props = {
      endDate: newMoment().add(10, 'years'),
      cronExpression: '0 15 * * *',
    };
    const { getByTestId } = render(<Repeat {...props} />);

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
  test('Renders month', async () => {
    const props = {
      endDate: newMoment().add(10, 'years'),
      cronExpression: '0 15 1 * *',
    };
    const { getByTestId } = render(<Repeat {...props} />);

    const week = getByTestId(/monthShort/);
    expect(week).toBeDefined();
  });
  test('Renders year', async () => {
    const props = {
      endDate: newMoment().add(10, 'years'),
      cronExpression: '0 15 1 1 *',
    };
    const { getByTestId } = render(<Repeat {...props} />);

    const year = getByTestId(/yearShort/);
    expect(year).toBeDefined();
  });
});
