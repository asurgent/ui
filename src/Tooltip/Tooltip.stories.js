import React from 'react';
import {
  withKnobs,
} from '@storybook/addon-knobs';
import styled from 'styled-components';
import * as Tooltip from './index';
import * as T from '../Typography';
import * as Tag from '../Tag';
import * as List from '../List';

const center = {
  height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center',
};

const someFormattedToolTip = `Headertext blablabal:

Some paragraphy text text text text text text text.

Some other text.
`;
const StoryContent = styled.div`
  * {font-size: 1.2rem!important;}
`;

const tags = Array.from({ length: 10 }, (_, i) => `Tag-${i}`);
const TooltipHeader = () => (<T.P.Main bold style={{ marginTop: '0' }}>Header</T.P.Main>);

const TooltipContent = () => (
  <StoryContent>
    <T.Title.H3>asurgent-cloudops-streamanalytics-prod</T.Title.H3>
    <List.Primary
      compact
      rows={[
        { label: 'Entity Type', value: 'subscription' },
        { label: 'Resource Group', value: 'rg-asurgent-sentinel-test' },
        { label: 'Region', value: 'westeurope' },
        { label: 'Customer', value: 'Asurgent AB (1168)' },
        { label: 'Id', value: '4A7B1D85F2CB1AB4E006E8BBEEA6D4ADBC55C9A6' },
      ]}
    />
  </StoryContent>
);
const TooltipFooter = () => <Tag.Collection tags={tags} maxTags={2} />;

export const card = () => (
  <div style={center}>
    <Tooltip.Top
      isCard
      header={<TooltipHeader />}
      content={<TooltipContent />}
      footer={<TooltipFooter />}
    >
      <div>
        <h1 style={{ display: 'inline-block' }}>Hover asdf</h1>
      </div>
    </Tooltip.Top>
  </div>
);

export const bottomMiddle = () => (
  <div style={center}>
    <Tooltip.Middle tip={someFormattedToolTip}>
      <div>
        <h1 style={{ display: 'inline-block' }}>Hover me</h1>
      </div>
    </Tooltip.Middle>
  </div>
);

export const rightCenter = () => (
  <div style={center}>
    <Tooltip.Right tip="Hello">
      <h1 style={{ display: 'inline-block' }}>Hover me</h1>
    </Tooltip.Right>
  </div>
);

export const LeftCenter = () => (
  <div style={center}>
    <Tooltip.Left tip="Hello">
      <h1 style={{ display: 'inline-block' }}>Hover me</h1>
    </Tooltip.Left>
  </div>
);

export default {
  title: 'UI Components|Tooltip',
  decorators: [withKnobs],
};
