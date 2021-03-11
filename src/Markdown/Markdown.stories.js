import React from 'react';
import Markdown from './index';
import myMarkdown from './exampleMarkdown.md';

const Story = {
  title: 'Helpers/Markdown',
  component: Markdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};
export default Story;

const Template = (args) => <Markdown {...args} />;

export const Main = Template.bind({});
Main.args = {
  className: 'mySpecificClass',
  flavor: 'github',
  markdown: myMarkdown
}