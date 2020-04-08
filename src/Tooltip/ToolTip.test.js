/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '../test-utils';
import { Middle } from './index';

afterEach(cleanup);

describe('Tooltip', () => {
  test('Renders a tooltip with content', () => {
    const props = { title: 'Title' };

    const { getByText } = render(
      <Middle>
        <p>{props.title}</p>
      </Middle>,
    );

    const title = getByText(props.title);
    expect(title).toBeDefined();
  });
});
