/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
import React from 'react';
import * as Tag from './index';

const Story = {
  title: 'Components/Tags',
  component: Tag,
  argTypes: {
    content: { control: 'text' },
    withMargins: { control: 'boolean' },
    renderTransparent: { control: 'boolean' },
  },
};
export default Story;

export const Single = (args) => (
  <Tag.Single onDelete={args.hasDeleteAction ? console.log('click') : false} {...args} />
);
Single.args = {
  hasDeleteAction: false,
  label: 'Tag',
  maxLength: 4,
};

export const Collection = (args) => {
  const tags = Array.from({ length: 10 }, (_, i) => `Tag-${i}`);
  return (
    <Tag.Collection tags={tags} {...args} />
  );
};
Collection.args = {
  label: 'Tag',
  maxLength: 4,
};

export const CollectionObject = (args) => {
  const tags = Array.from({ length: 10 }, (_, i) => ({
    value: `Tag-${i}`,
    onDelete: () => console.log('click', `Tag-${i}`),
  }));
  return (
    <Tag.Collection tags={tags} {...args} />
  );
};
CollectionObject.args = {
  label: 'Tag',
  maxLength: 4,
};
