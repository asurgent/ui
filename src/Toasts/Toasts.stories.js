import React from 'react';
import { Manager, addToast } from './index';

const Story = {
  title: 'Components/Toasts',
  component: Manager,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};
export default Story;

const message = (
  <p>
    One morning, when Gregor Samsa woke from
    {' '}
    <b>troubled dreams</b>
    , he found himself transformed in his bed into a horrible
  </p>
);

const add = () => addToast(message, 'info');
const error = () => addToast(message, 'error');
const success = () => addToast(message, 'success');
const warning = () => addToast(message, 'warning');

const Template = (args) => (
  <>
    <button type="button" onClick={add}>Add</button>
    <button type="button" onClick={error}>Error</button>
    <button type="button" onClick={success}>Success</button>
    <button type="button" onClick={warning}>Warning</button>
    <Manager {...args} />
  </>
);

export const Toasts = Template.bind({});
Toasts.args = {};
