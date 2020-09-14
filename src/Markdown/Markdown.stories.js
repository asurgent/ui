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

export const markdown = () => (
  <Markdown.Primary
    className={text('Some extra class', 'mySpecificClass')}
    flavor={text('Flavor (github, original, vanilla)', 'github')}
    markdown={text('Markdown', myMarkdown)}
    style={{ padding: '1rem' }}
  />
);
