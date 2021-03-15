import React from 'react';
import * as List from './index';

const Story = {
  title: 'Data/List',
  component: List.Primary,
  argTypes: {},
};
export default Story;

const Template = (args) => <List.Primary {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  rows: [
    false && { label: 'Label', value: 'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello' },
    { label: 'Label', value: 'Hello' },
    { label: 'Label', value: 'Hello' },
    { label: 'Label', value: '' },
    { label: 'Label 123123', value: 'Hello' },
    { label: 'Label value 0', value: 0 },
    { label: 'Label value []', value: [] },
    { label: 'Label value {}', value: {} },
    { label: 'Label value null', value: null },
    { label: 'Label value undefined', value: undefined },
  ],
};
