
import React from 'react';
import Component from './PrimaryParagraph';

export default {
  title: 'typography|Paragraph',
};

export const toStorybook = () => (<Component>
  Paragraph Primary
</Component>);

toStorybook.story = {
  name: 'Primary Paragraph',
};
