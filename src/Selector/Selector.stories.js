import React from 'react';
import {
  withKnobs,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import * as Selector from './index';

export default { title: 'UI Components|Selector', decorators: [withKnobs] };

export const year = () => (
  <Selector.Year entries={[2020, 2019, 2018, 2017]} onSelect={(d) => action()('clicked', d)} />
);

year.story = {
  name: 'Selector Ring',
};
