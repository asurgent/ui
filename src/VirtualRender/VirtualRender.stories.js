import React from 'react';
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

const Story = {
  title: 'Components/Virtual Render',
  component: VirtualRender,
  argTypes: {},
};
export default Story;

const ListTemplate = (args) => {
  const items = Array.from({ length: args.numberOfEntries }, (_, i) => ({ pos: i }));

  return (
    <Wrapper>
      <VirtualRender.List items={items} {...args}>
        {({ pos }, i) => (
          <p key={i}>
            {`Position ${pos}`}
          </p>
        )}
      </VirtualRender.List>
    </Wrapper>
  );
};

export const List = ListTemplate.bind({});
List.args = {
  rowHeight: 60,
  numberOfEntries: 100,
};
