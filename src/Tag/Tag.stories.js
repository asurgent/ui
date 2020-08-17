import React from 'react';
import {
  withKnobs, number, text, boolean,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import * as Tag from './index';

export default { title: 'UI Components|Tag', decorators: [withKnobs] };

export const singeTag = () => (
  <>
    <Tag.Single
      onDelete={boolean('Has delete action', false) ? (action('click')) : false}
      label={text('Tag label', 'Tag')}
      max={number('Max letter count (0 is unlimited)', 0)}
    />
  </>
);

singeTag.story = {
  name: 'Single Tag',
};

export const tagCollection = () => {
  const tags = Array.from({ length: 10 }, (_, i) => `Tag-${i}`);
  return (
    <>
      <Tag.Collection tags={tags} max={number('Max tags (0 is unlimited)', 0)} />
    </>
  );
};

tagCollection.story = {
  name: 'Tag Collection from string array',
};

export const tagCollectionObject = () => {
  const tags = Array.from({ length: 10 }, (_, i) => ({
    value: `Tag-${i}`,
    onDelete: (() => action('click')(`Tag-${i}`)),
  }));
  return (
    <>
      <Tag.Collection tags={tags} max={number('Max tags (default is unlimited)', 0)} />
    </>
  );
};

tagCollectionObject.story = {
  name: 'Tag Collection from object',
};
