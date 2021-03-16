import React from 'react';
import { Primary } from './index';
import myMarkdown from './exampleMarkdown.md';

const Story = {
  title: 'Helpers/Markdown',
  component: Primary,
  argTypes: {},
};
export default Story;

const Template = (args) => <Primary {...args} />;

export const Main = Template.bind({});
Main.args = {
  className: 'mySpecificClass',
  flavor: 'github',
  markdown: myMarkdown,
  foldQuotes: true,
};
