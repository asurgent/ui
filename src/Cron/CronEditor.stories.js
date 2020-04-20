import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

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
    onChange={(e) => action()('Changed', e)}
  />
);
