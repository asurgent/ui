import React from 'react';
import {
  withKnobs,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import * as Selector from './index';

export default { title: 'UI Components|Selector', decorators: [withKnobs] };

export const main = () => (
  <Selector.Main
    entries={[
      { label: '2020', value: 2020 },
      { label: 'tvåtusen nitton', value: 2019, default: true },
      { label: '2k18', value: 2018, default: false },
    ]}
    onSelect={(d) => action()('clicked', d)}
  />
);

main.story = {
  name: 'Selector Main',
};
