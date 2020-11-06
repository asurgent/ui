import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Manager, addToast } from './index';

export default { title: 'UI Components|Toasts', decorators: [withKnobs] };

export const toasts = () => {
  const add = () => addToast('HellofriendsImanerrorHellofriendsImanerrorHellofriendsImanerrorHellofriendsImanerror', 'info');

  return (
    <>
      <button onClick={add}>Add</button>
      <Manager />
    </>
  );
};

toasts.story = {
  name: 'Single Tag',
};
