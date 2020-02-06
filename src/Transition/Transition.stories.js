import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import * as Transitions from './index';


export const fadeIn = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ height: '100vh' }}>
      <button onClick={() => setOpen(!open)}>{open ? 'hide' : 'show'}</button>
      <Transitions.FadeIn isVisible={open}>
        <p>Hello</p>
      </Transitions.FadeIn>
    </div>
  );
};


export const fadeInSlideDown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ height: '100vh' }}>
      <button onClick={() => setOpen(!open)}>{open ? 'hide' : 'show'}</button>
      <Transitions.FadeInSlideDown isVisible={open}>
        <p>Hello</p>
      </Transitions.FadeInSlideDown>
    </div>
  );
};

export default {
  title: 'Ui Components|Transitions',
  decorators: [withKnobs],
};
