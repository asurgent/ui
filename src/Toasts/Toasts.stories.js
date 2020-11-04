import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Toasts, { addToast } from './index';

export default { title: 'UI Components|Toasts', decorators: [withKnobs] };

export const toasts = () => {
  const add = () => addToast('Hello friends. Im an error!!', 'info');

  return (
    <>
      <button onClick={add}>Add</button>
      <Toasts />
    </>
  );
};

toasts.story = {
  name: 'Single Tag',
};
