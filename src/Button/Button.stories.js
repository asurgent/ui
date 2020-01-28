
import React from 'react';
import * as Button from './index';

const content = 'Button';

export default { title: 'UI Components|Buttons' };

export const iconButton = () => (
  <Button.Icon tooltip="Hello" saveLinkState link="/test" icon={<i className="fa fa-times" aria-hidden="true" />} />
);

iconButton.story = {
  name: 'Icon Button',
};

export const primaryButton = () => (
  <Button.Primary>{content}</Button.Primary>
);

primaryButton.story = {
  name: 'Primary Button',
};

export const secondaryButton = () => (
  <Button.Secondary>{content}</Button.Secondary>
);

secondaryButton.story = {
  name: 'Secondary Button',
};

export const hollowButton = () => (
  <Button.Hollow>{content}</Button.Hollow>
);

hollowButton.story = {
  name: 'Hollow Button',
};

export const plainButton = () => (
  <Button.Plain>{content}</Button.Plain>
);

plainButton.story = {
  name: 'Plain Button',
};

export const transparentButton = () => (
  <Button.Transparent>{content}</Button.Transparent>
);

transparentButton.story = {
  name: 'Transparent Button',
};

export const rejectButton = () => (
  <Button.Reject>{content}</Button.Reject>
);

rejectButton.story = {
  name: 'Reject Button',
};
