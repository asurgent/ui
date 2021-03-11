import React from 'react';
import * as Spinner from './index';

const Story = {
  title: 'Components/Spinner',
  component: Spinner.Ring,
  argTypes: {
    color: { control: 'color' },
  },
};
export default Story;

const Template = (args) => <Spinner.Ring {...args} />;

export const Ring = Template.bind({});
Ring.args = {
  size: 100,
  speed: 2,
  color: '#239d34'
};