/* eslint-env jest */

import React from 'react';
import moment from 'moment';
import {
  render, cleanup,
} from 'test-utils';
import Repeat from './index';

afterEach(cleanup);

describe('Duration', () => {
  test('Renders minute', async () => {
    const props = {
      endDate: moment().add(10, 'years'),
      cronExpression: '* * * * *',
    };
    const { getByTestId } = render(<Repeat {...props} />);

    const minute = getByTestId(/minuteShort/);
    expect(minute).toBeDefined();
  });
  test('Renders hour', async () => {
    const props = {
      endDate: moment().add(10, 'years'),
      cronExpression: '0 * * * *',
    };
    const { getByTestId } = render(<Repeat {...props} />);

    const hour = getByTestId(/hourShort/);
    expect(hour).toBeDefined();
  });
  test('Renders day', async () => {
    const props = {
      endDate: moment().add(10, 'years'),
      cronExpression: '0 15 * * *',
    };
    const { getByTestId } = render(<Repeat {...props} />);

    const day = getByTestId(/dayShort/);
    expect(day).toBeDefined();
  });
  test('Renders week', async () => {
    const props = {
      endDate: moment().add(1, 'year'),
      cronExpression: '0 15 * * 1',
    };
    const { getByTestId } = render(<Repeat {...props} />);

    const week = getByTestId(/weekShort/);
    expect(week).toBeDefined();
  });
  test('Renders month', async () => {
    const props = {
      endDate: moment().add(10, 'years'),
      cronExpression: '0 15 1 * *',
    };
    const { getByTestId } = render(<Repeat {...props} />);

    const week = getByTestId(/monthShort/);
    expect(week).toBeDefined();
  });
  test('Renders year', async () => {
    const props = {
      endDate: moment().add(10, 'years'),
      cronExpression: '0 15 1 1 *',
    };
    const { getByTestId } = render(<Repeat {...props} />);

    const year = getByTestId(/yearShort/);
    expect(year).toBeDefined();
  });
});
