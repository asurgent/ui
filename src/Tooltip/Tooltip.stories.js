import React from 'react';
import {
  withKnobs,
} from '@storybook/addon-knobs';
import styled from 'styled-components';
import * as Tooltip from './index';
import * as T from '../Typography';
import * as Tag from '../Tag';

const center = {
  height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center',
};

const someFormattedToolTip = `Headertext blablabal:

Some paragraphy text text text text text text text.

Some other text.
`;
const tags = Array.from({ length: 10 }, (_, i) => `Tag-${i}`);

const MyHeader = styled.div`
  p {
    font-size: 1.4rem;
    margin: 0;
  }
  p:last-child {
    font-size: 1rem;
    margin-bottom: 0.8rem;
  }
`;

const TooltipHeader = () => (
  <MyHeader>
    <T.P.Main bold>Asurgent-cloudops-streamanalytics</T.P.Main>
    <T.P.Small>ID 4A7B1D85F2CB1AB4E006E8BBEEA6D4ADBC55C9A6</T.P.Small>
  </MyHeader>
);

const MyContent = styled.div`
  p {
    margin: 0;
    font-size: 12px;
  }
`;
const Gray = styled.span`
  color: gray;
`;
const TooltipContent = () => (
  <MyContent>
    <T.P.Main bold>Asurgent AB (1168)</T.P.Main>
    <T.P.Small>
      <Gray>Entity type </Gray>
      subscribtion
    </T.P.Small>

    <T.P.Small>
      <Gray>Resource group </Gray>
      rg-asurgent-sentinel-test
    </T.P.Small>

    <T.P.Small>
      <Gray>Region </Gray>
      westeurope
    </T.P.Small>
    <Tag.Collection tags={tags} maxTags={3} maxLength={4} style={{ marginTop: '0.8rem' }} />
  </MyContent>
);

export const card = () => (
  <>
    <div style={center}>
      <Tooltip.Top
        isCard
        header={<TooltipHeader />}
        content={<TooltipContent />}
      >
        <div style={{ background: 'black', color: 'white' }}>
          <h1 style={{ display: 'inline-block' }}>Hover me</h1>
        </div>
      </Tooltip.Top>
    </div>

  </>
);

export const bottomMiddle = () => (
  <div style={center}>
    <Tooltip.Middle tip={someFormattedToolTip}>
      <div style={{ background: 'black', color: 'white' }}>
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
