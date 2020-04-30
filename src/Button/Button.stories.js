
import React from 'react';
import * as Icon from '@material-ui/icons';
import {
  withKnobs, boolean, string,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import * as Button from './index';

const content = 'Button text ';

export default { title: 'UI Components|Buttons', decorators: [withKnobs] };


export const saveToFileButton = () => (
  <>
    <Button.Icon saveToFilename="some_file" tooltip="Saves from promise" saveToJson={() => new Promise((r) => r(['a', 'b']))} icon={<Icon.ConfirmationNumber fontSize="large" />} />
    <Button.Icon saveToFilename="another_file" tooltip="Saves from object" saveToJson={() => ['a', 'b']} icon={<Icon.ConfirmationNumber fontSize="large" />} />
  </>
);
export const iconButton = () => (
  <Button.Icon tooltip="Hello" saveLinkState link="/test" icon={<Icon.ConfirmationNumber fontSize="large" />} />
);

export const submitButton = () => (
  <form onSubmit={(e) => {
    e.preventDefault();
    action('Submit')('Submit with submit-button', e);
  }}
  >
    <Button.Primary type="submit">{content}</Button.Primary>
  </form>
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
  <Button.Link iconLeft={<Icon.ConfirmationNumber fontSize="medium" />}>{content}</Button.Link>
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

export const pillButton = () => (
  <Button.Pill>{content}</Button.Pill>
);

export const tooltipButton = () => (
  <Button.Pill tooltip="hello" tooltipOrientation={string('orientation (middle,left,right)', 'middle')}>{content}</Button.Pill>
);
