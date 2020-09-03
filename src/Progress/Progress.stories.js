import React from 'react';
import {
  withKnobs, number, boolean, text,
} from '@storybook/addon-knobs';
import * as Progress from './index';

export default { title: 'UI Components|Progress', decorators: [withKnobs] };

export const ring = () => (
  <div style={{ padding: '2rem' }}>
    <Progress.Ring
      radius={number('Radius', 60)}
      stroke={number('Stroke', 4)}
      progress={number('Progress', 90)}
      showPercentage={boolean('Show percentage', false)}
      color={text('Color', null)}
    />
  </div>
);

ring.story = {
  name: 'Ring',
};
