import React from 'react';
import * as Progress from './index';

const Story = {
  title: 'Components/Progress',
  component: Progress,
  argTypes: {
    color: { control: 'color' },
  },
};
export default Story;

const RingTemplate = (args) => <Progress.Ring {...args} />;

export const Ring = RingTemplate.bind({});
Ring.args = {
  radius: 80,
  stroke: 5,
  progress: 75,
  showPercentage: false,
  color: '#faaaab',
  useShadow: false,
  useAnimation: false
};

const BarTemplate = (args) => <Progress.Bar {...args} />;

export const Bar = BarTemplate.bind({});
Bar.args = {
  progress: 75,
  height: '300px',
  width: '2px',
  showNumber: true
};
