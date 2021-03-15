import React from 'react';
import styled from 'styled-components';
import * as Tooltip from './index';

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const someFormattedToolTip = `Headertext blablabal:

Some paragraphy text text text text text text text.

Some other text.
`;

const Story = {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {},
};
export default Story;

const content = (<h1 style={{ display: 'inline-block' }}>Hover me</h1>);

const MiddleTemplate = (args) => (
  <Center>
    <Tooltip.Middle {...args}>{content}</Tooltip.Middle>
  </Center>
);
export const Middle = MiddleTemplate.bind({});
Middle.args = {
  tip: someFormattedToolTip,
};

const TopTemplate = (args) => <Center><Tooltip.Top {...args}>{content}</Tooltip.Top></Center>;
export const Top = TopTemplate.bind({});
Top.args = {
  tip: someFormattedToolTip,
};

const LeftTemplate = (args) => <Center><Tooltip.Left {...args}>{content}</Tooltip.Left></Center>;
export const Left = LeftTemplate.bind({});
Left.args = {
  tip: someFormattedToolTip,
};

const RightTemplate = (args) => <Center><Tooltip.Right {...args}>{content}</Tooltip.Right></Center>;
export const Right = RightTemplate.bind({});
Right.args = {
  tip: someFormattedToolTip,
};

const EntityTemplate = (args) => (
  <Center>
    <Tooltip.Cards.Entity.Top {...args}>{content}</Tooltip.Cards.Entity.Top>
  </Center>
);
export const Entity = EntityTemplate.bind({});
Entity.args = {
  id: 123,
  name: 'Gurka',
  type: 'Mine',
  resourceGroup: 'Sweden',
  region: 'Sthlm',
  displayName: 'Asurgent',
  tags: ['test-tag'],
};

const CardTemplate = (args) => (
  <Center>
    <Tooltip.Middle {...args}>{content}</Tooltip.Middle>
  </Center>
);
export const Card = CardTemplate.bind({});
Card.args = {
  isCard: true,
  header: <p>header</p>,
  content: <p>content</p>,
  footer: <p>footer</p>,
};
