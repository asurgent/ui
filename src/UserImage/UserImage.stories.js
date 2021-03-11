import React from 'react';
import * as UserImage from './index';

const Story = {
  title: 'Components/User Image',
  component: UserImage,
};
export default Story;

const SquareTemplate = (args) => <UserImage.Square {...args} />;

export const Square = SquareTemplate.bind({});
Square.args = {
  size: "10rem",
  name: "Kalle Anka",
  email: "mail@mail.com",
  href: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
};

const CircleTemplate = (args) => <UserImage.Circle {...args} />;

export const Circle = CircleTemplate.bind({});
Circle.args = {
  size: "10rem",
  name: "Kalle Anka",
  email: "mail@mail.com",
  href: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
};

export const Initials = CircleTemplate.bind({});
Initials.args = {
  size: "10rem",
  name: "Kalle Anka",
  email: "mail@mail.com",
};
