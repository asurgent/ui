/* eslint-disable no-console */
import React from 'react';
import * as Cron from './index';

const Story = {
  title: 'Helpers/CronEditor',
  component: Cron.Editor,
  argTypes: {},
};
export default Story;

const Template = (args) => <Cron.Editor {...args} />;

export const Main = Template.bind({});
Main.args = {
  onChange: (e) => console.log('onChange', e),
  end: new Date(),
  start: new Date(),
  duration: '3600',
  expression: '*/5 * * * *',
};
