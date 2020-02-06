
import React from 'react';
import * as Icon from '@material-ui/icons';
import {
  withKnobs, boolean,
} from '@storybook/addon-knobs';
import * as Button from './index';

const content = 'Button text ';

export default { title: 'UI Components|Buttons', decorators: [withKnobs] };


export const iconButton = () => (
  <Button.Icon tooltip="Hello" saveLinkState link="/test" icon={<Icon.ConfirmationNumber fontSize="large" />} />
);

export const primaryButton = () => (
  <Button.Primary loading={boolean('loading', true)}>{content}</Button.Primary>
);

export const secondaryButton = () => (
  <Button.Secondary>{content}</Button.Secondary>
);

export const hollowButton = () => (
  <Button.Hollow>{content}</Button.Hollow>
);

export const hrefButton = () => (
  <Button.Primary disabled link="https://google.com">{content}</Button.Primary>
);

export const plainButton = () => (
  <Button.Plain>{content}</Button.Plain>
);

export const linkButton = () => (
  <Button.Link>{content}</Button.Link>
);

export const transparentButton = () => (
  <Button.Transparent>{content}</Button.Transparent>
);

export const rejectButton = () => (
  <Button.Reject>{content}</Button.Reject>
);

export const acceptButton = () => (
  <Button.Create>{content}</Button.Create>
);
