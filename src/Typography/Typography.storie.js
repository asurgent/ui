/* eslint-disable camelcase */
import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import * as T from './index';

export default { title: 'UI Components|Typography', decorators: [withKnobs] };

export const typography = () => {
  const [myText, setMyText] = useState('I am a text');
  return (
    <div style={{ padding: '2rem' }}>
      <input type="text" value={myText} onChange={({ target }) => setMyText(target.value)} />
      <T.Title.H1>{`${myText} (Title.H1)`}</T.Title.H1>
      <T.Title.H2>{`${myText} (Title.H2)`}</T.Title.H2>
      <T.Title.H3>{`${myText} (Title.H3)`}</T.Title.H3>
      <T.P.Main>{`${myText} (P.Main)`}</T.P.Main>
      <T.P.Main gray>{`${myText} gray`}</T.P.Main>
      <T.P.Main bold>{`${myText} bold`}</T.P.Main>
      <T.P.Small>{`${myText} small`}</T.P.Small>
    </div>
  );
};

typography.story = {
  name: 'Typography',
};
