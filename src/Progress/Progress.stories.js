import React from 'react';
import {
  withKnobs, number, boolean, text,
} from '@storybook/addon-knobs';
import * as Progress from './index';

export default { title: 'UI Components|Progress', decorators: [withKnobs] };

export const ring = () => (
  <div style={{ padding: '2rem' }}>
    <Progress.Ring
      radius={number('Radius', 80)}
      stroke={number('Stroke', 5)}
      progress={number('Progress', 75)}
      showPercentage={boolean('Show percentage', false)}
      color={text('Color', null)}
      useShadow={boolean('Use shadow', false)}
      useAnimation={boolean('Animated', false)}
    />
  </div>
);

ring.story = {
  name: 'Ring',
};
