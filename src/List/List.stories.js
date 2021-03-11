import React from 'react';
import MdiIcon from '@mdi/react';
import { mdiCompass } from '@mdi/js';
import * as List from './index';
import * as Button from '../Button/index';

const Story = {
  title: 'Components/List',
  component: List.Primary,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
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
  ]
};
