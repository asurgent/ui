/* eslint-disable no-console */
import React from 'react';
import styled from 'styled-components';
import * as Shield from './index';

const Container = styled.div`
  height: 100vh;
`;

const content = (
  <h1 style={{ background: 'pink', padding: '2rem' }}>
    Click outside me!
  </h1>
);

const Story = {
  title: 'Helpers/Shield',
  component: Shield,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};
export default Story;

const DarkTemplate = (args) => (
  <Container>
    <Shield.Dark {...args}>
      {content}
    </Shield.Dark>
  </Container>
);

export const Dark = DarkTemplate.bind({});
Dark.args = {
  onClick: () => console.log('clicked'),
};

const TransparentTemplate = (args) => (
  <Container>
    <Shield.Transparent {...args}>
      {content}
    </Shield.Transparent>
  </Container>
);

export const Transparent = TransparentTemplate.bind({});
Transparent.args = {
  onClick: () => console.log('clicked'),
};

const CustomTemplate = (args) => (
  <Container>
    <Shield.Custom {...args}>
      {content}
    </Shield.Custom>
  </Container>
);

export const Custom = CustomTemplate.bind({});
Custom.args = {
  onClick: () => console.log('clicked'),
  backgroundColor: '#d59a24',
};
