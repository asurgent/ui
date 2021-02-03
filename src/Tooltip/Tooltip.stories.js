import React from 'react';
import {
  withKnobs,
} from '@storybook/addon-knobs';
import * as Tooltip from './index';
import * as T from '../Typography';

const center = {
  height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center',
};

const someFormattedToolTip = `Headertext blablabal:

Some paragraphy text text text text text text text.

Some other text.
`;

export const card = () => (
  <div style={center}>
    <Tooltip.Card
      header={<T.P.Main>header</T.P.Main>}
      footer={<p>footer</p>}
      content={<p>i am content</p>}
      tip={someFormattedToolTip}
    >
      <div>
        <h1 style={{ display: 'inline-block' }}>Hover asdf</h1>
      </div>
    </Tooltip.Card>
  </div>
);

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
