/* eslint-env jest */

import React from 'react';
import { render, cleanup } from 'test-utils';
import { Single } from './index';

afterEach(cleanup);

describe('Tag', () => {
  test('Renders tag with label', () => {
    const props = { label: 'Some label' };

    const { getByText } = render(
      <Single {...props} />,
    );

    const label = getByText(props.label);
    expect(label).toBeDefined();
  });
});
