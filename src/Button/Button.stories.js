import React from 'react';
import * as Icon from '@material-ui/icons';
import {
  withKnobs, boolean, text,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import * as Button from './index';

const content = 'Button text ';

export default { title: 'UI Components|Buttons', decorators: [withKnobs] };

export const saveToFileButton = () => (
  <>
    <Button.Icon saveToFilename="some_file" tooltip="Saves from promise" saveToJson={() => new Promise((r) => r(['a', 'b']))} icon={<Icon.ConfirmationNumber fontSize="large" onClick={(e) => action('Clicked!')(e)} />} />
    <Button.Icon saveToFilename="another_file" tooltip="Saves from object" saveToJson={() => ['a', 'b']} icon={<Icon.ConfirmationNumber fontSize="large" onClick={(e) => action('Clicked!')(e)} />} />
  </>
);
export const iconButton = () => (
  <Button.Icon tooltip="Hello" saveLinkState link="/test" icon={<Icon.ConfirmationNumber fontSize="large" onClick={(e) => action('Clicked!')(e)} />} />
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
  <Button.Primary loading={boolean('loading', true)} onClick={(e) => action('Clicked!')(e)}>{content}</Button.Primary>
);

export const secondaryButton = () => (
  <Button.Secondary onClick={(e) => action('Clicked!')(e)}>{content}</Button.Secondary>
);

export const hollowButton = () => (
  <Button.Hollow onClick={(e) => action('Clicked!')(e)}>{content}</Button.Hollow>
);

export const hrefButton = () => (
  <Button.Primary disabled link="https://google.com" onClick={(e) => action('Clicked!')(e)}>{content}</Button.Primary>
);

export const plainButton = () => (
  <Button.Plain onClick={(e) => action('Clicked!')(e)}>{content}</Button.Plain>
);

export const linkButton = () => (
  <Button.Link iconLeft={<Icon.ConfirmationNumber fontSize="medium" onClick={(e) => action('Clicked!')(e)} />}>{content}</Button.Link>
);

export const transparentButton = () => (
  <Button.Transparent onClick={(e) => action('Clicked!')(e)}>{content}</Button.Transparent>
);

export const rejectButton = () => (
  <Button.Reject onClick={(e) => action('Clicked!')(e)}>{content}</Button.Reject>
);

export const acceptButton = () => (
  <Button.Create onClick={(e) => action('Clicked!')(e)}>{content}</Button.Create>
);

export const pillButton = () => (
  <Button.Pill onClick={(e) => action('Clicked!')(e)} iconRight={<Icon.ConfirmationNumber fontSize="medium" />}>{content}</Button.Pill>
);

export const tooltipButton = () => (
  <Button.Primary tooltip="hello" tooltipOrientation={text('orientation (middle,left,right)', 'middle')} onClick={(e) => action('Clicked!')(e)}>
    {content}
  </Button.Primary>
);
