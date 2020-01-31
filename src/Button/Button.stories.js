
import React from 'react';
import * as Icon from '@material-ui/icons';
import * as Button from './index';

const content = 'Button';

export default { title: 'UI Components|Buttons' };

export const iconButton = () => (
  <Button.Icon tooltip="Hello" saveLinkState link="/test" icon={<i className="fa fa-times" aria-hidden="true" />} />
);

export const primaryButton = () => (
  <Button.Primary>{content}</Button.Primary>
);

export const secondaryButton = () => (
  <Button.Secondary>{content}</Button.Secondary>
);

export const hollowButton = () => (
  <Button.Hollow>{content}</Button.Hollow>
);

export const plainButton = () => (
  <Button.Plain>{content}</Button.Plain>
);

export const transparentButton = () => (
  <Button.Transparent>{content}</Button.Transparent>
);

export const rejectButton = () => (
  <Button.Reject>{content}</Button.Reject>
);
