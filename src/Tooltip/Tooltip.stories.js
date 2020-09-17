import React from 'react';
import {
  withKnobs,
} from '@storybook/addon-knobs';
import * as Tooltip from './index';

const center = {
  height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center',
};

const someFormattedToolTip = `Headertext blablabal:

Some paragraphy text text text text text text text.

Some other text.
`;

export const bottomMiddle = () => (
  <div style={center}>
    <Tooltip.Middle tip={someFormattedToolTip}>
      <div>
        <h1 style={{ display: 'inline-block' }}>Hover me</h1>
      </div>
    </Tooltip.Middle>
  </div>
);

export const rightCenter = () => (
  <div style={center}>
    <Tooltip.Right tip="Hello">
      <h1 style={{ display: 'inline-block' }}>Hover me</h1>
    </Tooltip.Right>
  </div>
);

export const LeftCenter = () => (
  <div style={center}>
    <Tooltip.Left tip="Hello">
      <h1 style={{ display: 'inline-block' }}>Hover me</h1>
    </Tooltip.Left>
  </div>
);

export default {
  title: 'UI Components|Tooltip',
  decorators: [withKnobs],
};
