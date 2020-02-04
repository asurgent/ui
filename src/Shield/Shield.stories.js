import React from 'react';
import {
  withKnobs, boolean, text, number,
} from '@storybook/addon-knobs';
import * as Shield from './index';


export const darkShield = () => (
  <div style={{ height: '100vh' }}>
    <Shield.Dark onClick={() => { console.log('Clicked'); }}>
      <h1 style={{ background: 'pink', padding: '2rem' }}>
        Click outside me!
      </h1>
    </Shield.Dark>
  </div>
);

export const transparentShield = () => (
  <div style={{ height: '100vh' }}>
    <Shield.Transparent onClick={() => { console.log('Clicked'); }}>
      <h1 style={{ background: 'pink', padding: '2rem' }}>
        Click outside me!
      </h1>
    </Shield.Transparent>
  </div>
);

export const customColorShield = () => (
  <div style={{ height: '100vh' }}>
    <Shield.Custom backgroundColor={(theme) => theme.rgba(theme.blue900, 0.8)} onClick={() => { console.log('Clicked'); }}>
      <h1 style={{ background: 'pink', padding: '2rem' }}>
        Click outside me!
      </h1>
    </Shield.Custom>
  </div>
);

export default {
  title: 'UI Components|Shield',
  decorators: [withKnobs],
};
