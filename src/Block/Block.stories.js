
import React from 'react';
import {
  withKnobs, boolean, number,
} from '@storybook/addon-knobs';
import * as Block from './index';

const content = 'Hello there im in a block';

export default { title: 'UI Components|Block', decorators: [withKnobs] };

export const centerBlock = () => (
  <Block.Center>{content}</Block.Center>
);

export const leftBlock = () => (
  <Block.Left>{content}</Block.Left>
);

export const rightBlock = () => (
  <Block.Right>{content}</Block.Right>
);

export const borderedBlock = () => (
  <div style={{ height: '20vh' }}>
    <Block.Bordered noShadow={boolean('Without shadow', false)}>{content}</Block.Bordered>
  </div>
);

export const plainBlock = () => (
  <Block.Plain>{content}</Block.Plain>
);

export const renderTransparentBlock = () => (
  <Block.Plain renderTransparent={boolean('Transparent', true)}>{content}</Block.Plain>
);

export const spaceBetweenBlock = () => (
  <Block.SpaceBetween>
    <span>{content}</span>
    <span>{content}</span>
  </Block.SpaceBetween>
);

export const wrapBlock = () => (
  <Block.Wrap wrapReverse={boolean('Reverse order', false)}>
    <span>I am block #1</span>
    <span>I am block #2</span>
  </Block.Wrap>
);

export const wrapGridBlock = () => (
  <Block.WrapGrid
    columnMinWidth={number('Min width of column', 500)}
    gridGap={number('Gap between columns (unwrapped)', 20)}
    stretchColumns={boolean('Stretch columns', false)}
  >
    <div style={{ border: '1px solid black' }}>
      <div style={{ padding: '10rem' }}>
        Block with lots of content
      </div>
    </div>
    <div style={{ border: '1px solid black' }}>
      <div style={{ padding: '2rem' }}>
        Block with little content
      </div>
    </div>
  </Block.WrapGrid>
);

export const errorBlock = () => (
  <Block.Error hideLeftBorder={boolean('Hide left border', true)} title="Error ocurred">
    <p>Something is broken</p>
  </Block.Error>
);

export const warningBlock = () => (
  <Block.Warning hideLeftBorder={boolean('Hide left border', true)} title="Some warning">
    <p>More warnings</p>
  </Block.Warning>
);

export const infoBlock = () => (
  <Block.Info
    hideLeftBorder={boolean('Hide left border', true)}
    withMargins={boolean('Add margin (all)', false)}
    withBottomMargin={boolean('Add margin (bottom)', false)}
    title="Some information"
  >
    <p>Additional information</p>
  </Block.Info>
);

export const emptyState = () => (
  <Block.Emptystate title="Error ocurred">
    <p>Somethings broken</p>
  </Block.Emptystate>
);


centerBlock.story = {
  name: 'Center Block',
};
leftBlock.story = {
  name: 'Left Block',
};
rightBlock.story = {
  name: 'Right Block',
};
borderedBlock.story = {
  name: 'Bordered Block',
};
plainBlock.story = {
  name: 'Plain Block',
};
spaceBetweenBlock.story = {
  name: 'SpaceBetween Block',
};
wrapBlock.story = {
  name: 'Wrap Block',
};
renderTransparentBlock.story = {
  name: 'Transparent Block',
};
