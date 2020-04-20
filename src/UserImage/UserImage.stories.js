import React from 'react';
import { withKnobs, number, text } from '@storybook/addon-knobs';
import * as UserImage from './index';

export default { title: 'UI Components|User Image', decorators: [withKnobs] };

export const squareImage = () => (
  <>
    <UserImage.Square
      size="10rem"
      name="Kalle Anka"
      email="mail@mail.com"
      href="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
    />
  </>
);

export const circleImage = () => (
  <>
    <UserImage.Circle
      size="10rem"
      name="Kalle Anka"
      email="mail@mail.com"
      href="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
    />
  </>
);

circleImage.story = {
  name: 'Circle',
};

export const initials = () => (
  <>
    <UserImage.Circle
      size={`${number('size size', '10')}rem`}
      name={text('Name for initials', 'Kalle Anka')}
      email={text('email adress (changes color)', 'mailmail')}
    />
  </>
);
