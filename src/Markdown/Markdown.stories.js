import React from 'react';
import {
  withKnobs, text,
} from '@storybook/addon-knobs';
import * as Markdown from './index';
import myMarkdown from './exampleMarkdown.md';

export default {
  title: 'UI Components|Markdown',
  decorators: [withKnobs({ escapeHTML: false })],
};

export const markdownWithHTML = () => (
  <Markdown.Primary
    markdown={text('Markdown', myMarkdown)}
    flavor={text('Flavor (github, original, vanilla)', 'github')}
  />
);
