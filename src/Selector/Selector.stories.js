import React from 'react';
import * as Selector from './index';

const Story = {
  title: 'Components/Selector',
  component: Selector,
  argTypes: {
    
  },
};
export default Story;

const Template = (args) => <Selector.Main {...args} />;

export const Main = Template.bind({});
Main.args = {
  entries: [
    { label: '2020', value: 2020 },
    { label: 'tvåtusen och nitton', value: 2019, default: true },
    { label: '2k18', value: 2018, default: false },
  ],
  onSelect: e => console.log('clicked', e)
}