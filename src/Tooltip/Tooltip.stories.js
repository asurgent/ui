import React from 'react';
import {
  withKnobs,
} from '@storybook/addon-knobs';
import * as Tooltip from './index';


export const bottomMiddle = () => (
  <div style={{ height: '100vh' }}>
    <Tooltip.Middle tip="Hello">
      <h1>Hover me</h1>
    </Tooltip.Middle>
  </div>
);

export const rightCenter = () => (
  <div style={{ height: '100vh' }}>
    <Tooltip.Right tip="Hello">
      <h1>Hover me</h1>
    </Tooltip.Right>
  </div>
);


export default {
  title: 'UI Components|Tooltip',
  decorators: [withKnobs],
};
