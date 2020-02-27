import React, { useEffect } from 'react';
import {
  withKnobs, boolean, text, number,
} from '@storybook/addon-knobs';

import CronEditor from './index';

export default {
  title: 'UI Components|CronEditor',
  decorators: [withKnobs],
};


export const main = () => (
  <CronEditor
    end={new Date()}
    start={new Date()}
    duration="6324"
    expression="0 53 12 * * MON,WED,TUE,SUN#2"
    onChange={(c) => {
      console.log(c);
    }}
  />
);
