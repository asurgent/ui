/* eslint-disable react/button-has-type */
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Manager, addToast } from './index';

export default { title: 'UI Components|Toasts', decorators: [withKnobs] };

const message = (
  <p>
    One morning, when Gregor Samsa woke from
    {' '}
    <b>troubled dreams</b>
    , he found himself transformed in his bed into a horrible
  </p>
);

export const toasts = () => {
  const add = () => addToast(message, 'info');
  const error = () => addToast(message, 'error');
  const success = () => addToast(message, 'success');
  const warning = () => addToast(message, 'warning');

  return (
    <>
      <button onClick={add}>Add</button>
      <button onClick={error}>Error</button>
      <button onClick={success}>Success</button>
      <button onClick={warning}>Warning</button>
      <Manager />
    </>
  );
};

toasts.story = {
  name: 'Single Tag',
};
