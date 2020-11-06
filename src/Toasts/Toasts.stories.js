/* eslint-disable react/button-has-type */
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Manager, addToast } from './index';

export default { title: 'UI Components|Toasts', decorators: [withKnobs] };

const message = (
  <p>
    HellofriendsImanerrorHellofriendsImanerror
    <b> HellofriendsImanerror </b>
    HellofriendsImanerror
  </p>
);

export const toasts = () => {
  const add = () => addToast(message, 'info');

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
