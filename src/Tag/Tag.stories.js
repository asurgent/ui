
import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import * as Tag from './index';


export default { title: 'UI Components|Tag', decorators: [withKnobs] };

export const primaryTag = () => (
  <>
    <Tag.Single label="Lol" />
  </>
);

primaryTag.story = {
  name: 'Primary Tag',
};


export const tagCollection = () => {
  const tags = Array.from({ length: 10 }, (_, i) => `Tag-${i}`);
  return (
    <>
      <Tag.Collection tags={tags} max={number('Max tags (default is unlimited)', 0)} />
    </>
  );
};

primaryTag.story = {
  name: 'Primary Tag',
};
