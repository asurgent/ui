import React from 'react';
import * as Truncate from './index';

const Story = {
  title: 'Helpers/Truncate',
  component: Truncate,
  argTypes: {},
};
export default Story;

const StartTemplate = (args) => <Truncate.Start {...args} />;

export const Start = StartTemplate.bind({});
Start.args = {
  string: 'I am truncated string',
  maxLength: 6,
};

const CenterTemplate = (args) => <Truncate.Center {...args} />;

export const Center = CenterTemplate.bind({});
Center.args = {
  string: 'I am truncated string',
  maxLength: 6,
};

const EndTemplate = (args) => <Truncate.End {...args} />;

export const End = EndTemplate.bind({});
End.args = {
  string: 'I am truncated string',
  maxLength: 6,
};
