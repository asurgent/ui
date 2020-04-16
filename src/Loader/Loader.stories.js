import React from 'react';
import {
  withKnobs, number, text,
} from '@storybook/addon-knobs';
import * as Loader from './index';

export default { title: 'UI Components|Loader', decorators: [withKnobs] };

export const loader = () => (
  <Loader.Ring size={number('Size', 100)} speed={number('Speed', 2)} color={text('Color', '#239dd9')} />
);

loader.story = {
  name: 'Ring Loader',
};
