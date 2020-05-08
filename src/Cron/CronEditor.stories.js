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
    end={new Date()}
    start={new Date()}
    duration="3600"
    expression="*/5 * * * *"
    onChange={(e) => action()('onChange', e)}
  />
);
