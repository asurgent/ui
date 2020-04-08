/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '../test-utils';
import { Plain } from './index';

afterEach(cleanup);

describe('Block', () => {
  test('Renders block with content', () => {
    const props = {
      title: 'Title',
    };

    const { getByText } = render(
      <Plain>
        {props.title}
      </Plain>,
    );

    const title = getByText(props.title);
    expect(title).toBeDefined();
  });
});
