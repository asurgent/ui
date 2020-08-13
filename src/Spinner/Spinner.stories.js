import React from 'react';
import {
  withKnobs, number, text,
} from '@storybook/addon-knobs';
import * as Spinner from './index';

export default { title: 'UI Components|Spinner', decorators: [withKnobs] };

export const spinner = () => (
  <Spinner.Ring size={number('Size', 100)} speed={number('Speed', 2)} color={text('Color', '#239d34')} />
);

spinner.story = {
  name: 'Spinner Ring',
};
