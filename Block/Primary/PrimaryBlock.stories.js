import React from 'react';
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import Component from './PrimaryBlock';

export default {
  title: 'UI Components|Block',
  decorators: [withKnobs]
};
// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.

// Knobs for React props
export const withAButton = () => (
  <button disabled={boolean("Disabled", false)}>
    {text("Label", "Hello Storybook")}
  </button>
);

// Knobs as dynamic variables.
export const asDynamicVariables = () => {
  const name = text("Name", "Arunoda Susiripala");
  const age = number("Age", 89);

  const content = `I am ${name} and I'm ${age} years old.`;
  return <Component>{content}</Component>;
};

asDynamicVariables.story = {
  name: 'Primary Block',
};

withAButton.story = {
  name: 'Seconodary Block',
};