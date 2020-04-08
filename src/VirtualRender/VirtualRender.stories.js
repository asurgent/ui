import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import styled from 'styled-components';
import * as VirtualRender from './index';

const Wrapper = styled.div`
    width: 30rem;
    height: 50rem;
    display: block;
    margin: 2.4rem;
    border-radius: 3px;
    border-radius: 5px;
    background: ${({ theme }) => theme.white};
    border: 1px solid ${({ theme }) => theme.gray200};
`;


export default {
  title: 'UI Components|Virtual Render',
  decorators: [withKnobs],
};


export const list = () => {
  const rowDummyData = Array.from({
    length: number('Number of entries', 100),
  }, (_, i) => ({
    pos: i,
  }));


  return (
    <Wrapper>
      <VirtualRender.List items={rowDummyData} rowHeight={number('Row height', 60)}>
        {({ pos }, i) => (
          <p key={i}>
            {`Position ${pos}`}
          </p>
        )}
      </VirtualRender.List>
    </Wrapper>
  );
};
