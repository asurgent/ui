/* eslint-disable no-console */

import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import * as Cron from './index';

export default {
  title: 'UI Components|CronEditor',
  decorators: [withKnobs],
};


export const main = () => (
  <Cron.Editor
    end="2017-05-24"
    start="2017-05-24"
    duration="6324"
    expression="*/5 * * * *"
    onChange={(c) => {
      console.log(c);
    }}
  />
);
