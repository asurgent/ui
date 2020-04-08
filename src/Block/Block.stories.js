
import React from 'react';
import * as Block from './index';

const storyContent = 'Hello there im in a block';

export default { title: 'UI Components|Block' };

export const centerBlock = (content = storyContent) => (
  <Block.Center>{content}</Block.Center>
);

export const leftBlock = (content = storyContent) => (
  <Block.Left>{content}</Block.Left>
);

export const rightBlock = (content = storyContent) => (
  <Block.Right>{content}</Block.Right>
);

export const borderedBlock = (content = storyContent) => (
  <Block.Bordered>{content}</Block.Bordered>
);


export const plainBlock = (content = storyContent) => (
  <Block.Plain>{content}</Block.Plain>
);

export const renderTransparentBlock = (content = storyContent) => (
  <Block.Plain renderTransparent>{content}</Block.Plain>
);

export const spaceBetweenBlock = (content = storyContent) => (
  <Block.SpaceBetween>
    <span>{content}</span>
    <span>{content}</span>
  </Block.SpaceBetween>
);

export const wrapBlock = (content = storyContent) => (
  <Block.Wrap>
    <span>{content}</span>
    <span>{content}</span>
  </Block.Wrap>
);

export const errorBlock = () => (
  <Block.Error title="Error ocurred">
    <p>Somethigns broken</p>
  </Block.Error>
);

export const emptyState = () => (
  <Block.Emptystate title="Error ocurred">
    <p>Somethigns broken</p>
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
