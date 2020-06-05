import React, { useState } from 'react';
import {
  withKnobs, text, number,
} from '@storybook/addon-knobs';
import * as Dismissable from './index';

export default { title: 'UI Components|Dismissable', decorators: [withKnobs] };


export const plain = () => (
  <Dismissable.Plain
    id={text('Id', 'some.banner.id')}
    title={text('Title', 'I am a title')}
    description={text('Description', 'I am some description')}
    fadeOutSpeed={number('Fade out speed (ms)', 500)}
  >
    <p>some content</p>
  </Dismissable.Plain>
);

plain.story = {
  name: 'Plain',
};


export const primary = () => {
  const [id, setId] = useState('banner.storybook.primary');
  return (
    <>
      <Dismissable.Primary
        id={id}
        title={text('Title', 'I am a title')}
        description={text('Description', 'I am some description')}
        fadeOutSpeed={number('Fade out speed (ms)', 500)}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <p>some content</p>
          <button type="button">some button</button>
        </div>
      </Dismissable.Primary>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <p>Not part of component (just for the sake of the Storybook)</p>
        <input type="text" value={id} onChange={({ target }) => setId(target.value)} />
        <button type="button" onClick={() => window.localStorage.removeItem(id)}>Clear ID-value (refresh)</button>
      </div>
    </>
  );
};

primary.story = {
  name: 'Primary',
};
