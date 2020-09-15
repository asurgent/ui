/* eslint-disable camelcase */
import React from 'react';
import {
  withKnobs, text, number,
} from '@storybook/addon-knobs';
import * as Truncate from './index';

export default { title: 'UI Components|Truncate', decorators: [withKnobs] };

export const start = () => (
  <div style={{ padding: '2rem' }}>
    <Truncate.Start
      string={text('String', 'I am truncated string')}
      maxLength={number('Max length', 6)}
    />
  </div>
);

start.story = {
  name: 'Start',
};

export const center = () => (
  <div style={{ padding: '2rem' }}>
    <Truncate.Center
      string={text('String', 'I am truncated string')}
      maxLength={number('Max length', 6)}
    />
  </div>
);

center.story = {
  name: 'Center',
};

export const end = () => (
  <div style={{ padding: '2rem' }}>
    <Truncate.End
      string={text('String', 'I am truncated string')}
      maxLength={number('Max length', 6)}
    />
  </div>
);

end.story = {
  name: 'Start',
};
