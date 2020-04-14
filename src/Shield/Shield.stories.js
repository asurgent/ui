import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import * as Shield from './index';

export const darkShield = () => (
  <div style={{ height: '100vh' }}>
    <Shield.Dark onClick={action('Clicked')}>
      <h1 style={{ background: 'pink', padding: '2rem' }}>
        Click outside me!
      </h1>
    </Shield.Dark>
  </div>
);

export const transparentShield = () => (
  <div style={{ height: '100vh' }}>
    <Shield.Transparent onClick={action('Clicked')}>
      <h1 style={{ background: 'pink', padding: '2rem' }}>
        Click outside me!
      </h1>
    </Shield.Transparent>
  </div>
);

export const customColorShield = () => (
  <div style={{ height: '100vh' }}>
    <Shield.Custom backgroundColor={(theme) => theme.rgba(theme.blue900, 0.8)} onClick={action('Clicked')}>
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
