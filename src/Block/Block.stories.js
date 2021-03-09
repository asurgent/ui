import React from 'react';
/* import MdiIcon from '@mdi/react';
import { mdiMenuDown } from '@mdi/js'; */
import * as Block from './index';
/* import * as List from '../List';
import * as Button from '../Button'; */

const content = 'Hello there im in a block';

const Story = {
  title: 'Block',
  component: Block,
  argTypes: {
    backgroundColor: { control: 'color' },
    color: { control: 'color' },
  },
};
export default Story;

// 👇 We create a “template” of how args map to rendering
const Template = (args) => <Block.Center {...args}>{content}</Block.Center>;

// 👇 Each story then reuses that template
export const CenterBlock = Template.bind({});

CenterBlock.args = {
  content: 'Center Block',
};

/* export const leftBlock = () => (
  <Block.Left>{content}</Block.Left>
);

export const rightBlock = () => (
  <Block.Right>{content}</Block.Right>
);

export const borderedBlock = () => (
  <div style={{ height: '20vh' }}>
    <Block.Bordered noShadow={boolean('Without shadow', false)}>{content}</Block.Bordered>
  </div>
);

export const plainBlock = () => (
  <Block.Plain>{content}</Block.Plain>
);

export const stretchBlock = () => (
  <Block.Stretch>
    <div style={{ border: '1px solid' }}>
      {content}
    </div>
  </Block.Stretch>
);

export const renderTransparentBlock = () => (
  <Block.Plain renderTransparent={boolean('Transparent', true)}>{content}</Block.Plain>
);

export const spaceBetweenBlock = () => (
  <Block.SpaceBetween>
    <span>{content}</span>
    <span>{content}</span>
  </Block.SpaceBetween>
);

export const wrapBlock = () => (
  <Block.Wrap wrapReverse={boolean('Reverse order', false)}>
    <div style={{ minWidth: '400px', border: '1px solid', padding: '1rem' }}>I am block #1 (min-width: 400px)</div>
    <div style={{ minWidth: '400px', border: '1px solid', padding: '1rem' }}>I am block #2 (min-width: 400px)</div>
  </Block.Wrap>
);

export const wrapGridBlock = () => (
  <Block.WrapGrid
    columnMinWidth={number('Min width of column', 500)}
    gridGap={number('Gap between columns (unwrapped)', 20)}
    stretchColumns={boolean('Stretch columns', false)}
  >
    <div style={{ border: '1px solid black' }}>
      <div style={{ padding: '10rem' }}>
        Block with lots of content
      </div>
    </div>
    <div style={{ border: '1px solid black' }}>
      <div style={{ padding: '2rem' }}>
        Block with little content
      </div>
    </div>
  </Block.WrapGrid>
);

export const errorBlock = () => (
  <Block.Error hideLeftBorder={boolean('Hide left border', true)} title="Error ocurred">
    <p>Something is broken</p>
  </Block.Error>
);

export const warningBlock = () => (
  <Block.Warning hideLeftBorder={boolean('Hide left border', true)} title="Some warning">
    <p>More warnings</p>
  </Block.Warning>
);

export const infoBlock = () => (
  <Block.Info
    hideLeftBorder={boolean('Hide left border', true)}
    withMargins={boolean('Add margin (all)', false)}
    withBottomMargin={boolean('Add margin (bottom)', false)}
    title="Some information"
  >
    <p>Additional information</p>
  </Block.Info>
);

export const emptyState = () => (
  <Block.Emptystate title="Error ocurred">
    <p>Somethings broken</p>
  </Block.Emptystate>
);

export const accordion = () => (
  <div style={{ padding: '5rem' }}>
    <Block.Accordion title="Hello" description="Desc">
      {() => (
        <List.Primary
          rows={[
            { label: 'Label', value: 'Hello' },
            { label: 'Label', value: 'Hello' },
            { label: 'Label', value: '' },
            { label: 'Label 123123', value: 'Hello' },
            {
              row: (
                <Button.Stretched
                  iconRight={(
                    <MdiIcon
                      path={mdiMenuDown}
                      size={1.4}
                    />
                  )}
                >
                  Next
                </Button.Stretched>),
            },
          ]}
        />
      )}
    </Block.Accordion>
  </div>
);
const iWontRender = false;
export const subnavigationBlock = () => (
  <Block.SubnavigationBlock
    title="Hello"
    navigationList={[
      [
        {
          label: 'Other stuff', path: 'http://apple.com',
        },
        {
          label: 'Hidden stuff', path: 'http://apple.com', render: () => false,
        },
      ],
      [
        {
          row: (<div>hello</div>),
        },
        iWontRender && {
          label: 'On call',
          path: 'http://google.com',
          isActive: true,
          iconStyle: { background: 'pink' },
          navigationStyle: { background: 'magenta' },
          labelStyle: { background: 'orange' },
        },
        {
          label: 'Im an active one', path: 'http://apple.com', isActive: true,
        },
        {
          label: 'Hidden stuff', path: 'http://apple.com', render: () => false,
        },
      ]]}
  >
    <h2>I am title</h2>
    <Block.Bordered noShadow withPadding>
      <h2>Did you come in early?</h2>
      <p>
        Let your colleages sleep and snooze the On Call phone.
        When you hit the snooze button the On Call phone will no
        longer be active and calls will be redirected to you instead.
      </p>
    </Block.Bordered>
  </Block.SubnavigationBlock>
);
 */

/* leftBlock.story = {
  name: 'Left Block',
};
rightBlock.story = {
  name: 'Right Block',
};
borderedBlock.story = {
  name: 'Bordered Block',
};
plainBlock.story = {
  name: 'Plain Block',
};
spaceBetweenBlock.story = {
  name: 'SpaceBetween Block',
};
wrapBlock.story = {
  name: 'Wrap Block',
};
renderTransparentBlock.story = {
  name: 'Transparent Block',
};
 */
