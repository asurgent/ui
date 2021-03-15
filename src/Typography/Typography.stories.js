import React from 'react';
import styled from 'styled-components';
import * as T from './index';

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const Story = {
  title: 'Text/Typography',
  component: T,
};
export default Story;

const HeadersTemplate = (args) => (
  <FlexColumn>
    <T.Title.H1 {...args}>{`${args.text} Title.H1`}</T.Title.H1>
    <T.Title.H2 {...args}>{`${args.text} Title.H2`}</T.Title.H2>
    <T.Title.H3 {...args}>{`${args.text} Title.H3`}</T.Title.H3>
  </FlexColumn>
);

export const Headers = HeadersTemplate.bind({});
Headers.args = {
  text: 'Edit me',
};

const ParagraphTemplate = (args) => (
  <FlexColumn>
    <T.P.Main {...args}>{`${args.text} P.Main`}</T.P.Main>
    <T.P.Small {...args}>{`${args.text} P.Small`}</T.P.Small>
  </FlexColumn>
);

export const Paragraph = ParagraphTemplate.bind({});
Paragraph.args = {
  text: 'Edit me',
  gray: false,
  bold: false,
};
