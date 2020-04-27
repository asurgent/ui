
import React from 'react';
import {
  withKnobs, boolean,
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
  <Block.Bordered>{content}</Block.Bordered>
);

export const plainBlock = () => (
  <Block.Plain>{content}</Block.Plain>
);

export const renderTransparentBlock = () => (
  <Block.Plain renderTransparent>{content}</Block.Plain>
);

export const spaceBetweenBlock = () => (
  <Block.SpaceBetween>
    <span>{content}</span>
    <span>{content}</span>
  </Block.SpaceBetween>
);

export const wrapBlock = () => (
  <Block.Wrap>
    <span>{content}</span>
    <span>{content}</span>
  </Block.Wrap>
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
  <Block.Info hideLeftBorder={boolean('Hide left border', true)} title="Some information">
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
