import React from 'react';
import MdiIcon from '@mdi/react';
import { mdiMenuDown } from '@mdi/js';
import * as Block from './index';
import * as List from '../List';
import * as Button from '../Button';
import * as C from './components/Block.styled';

const Story = {
  title: 'Components/Block',
  component: Block,
  argTypes: {
    content: { control: 'text' },
    withMargins: { control: 'boolean' },
    renderTransparent: { control: 'boolean' },
  },
};
export default Story;

export const Center = (args) => (<C.Center {...args}>{args.content}</C.Center>);
Center.args = {
  content: 'hejhej',
};

export const Left = (args) => <C.Left {...args}>{args.content}</C.Left>;
Left.args = {
  content: 'hejhej',
};

export const Right = (args) => <C.Right {...args}>{args.content}</C.Right>;
Right.args = {
  content: 'hejhej',
};

export const Bordered = (args) => (<C.Bordered {...args}>{args.content}</C.Bordered>);
Bordered.args = {
  noShadow: true,
  content: 'hejhej',
};

export const Plain = (args) => <C.Plain {...args}>{args.content}</C.Plain>;
Plain.args = {
  content: 'hejhej',
};

export const Stretch = (args) => (
  <C.Stretch {...args}>
    <div style={{ border: '1px solid' }}>
      {args.content}
    </div>
  </C.Stretch>
);
Stretch.args = {
  content: 'hejhej',
};

export const SpaceBetween = (args) => (
  <C.SpaceBetween {...args}>
    <span>left</span>
    <span>right</span>
  </C.SpaceBetween>
);
SpaceBetween.args = {};

export const Wrap = (args) => (
  <C.Wrap {...args}>
    <div style={{ minWidth: '400px', border: '1px solid', padding: '1rem' }}>I am block #1 (min-width: 400px)</div>
    <div style={{ minWidth: '400px', border: '1px solid', padding: '1rem' }}>I am block #2 (min-width: 400px)</div>
  </C.Wrap>
);
Wrap.args = {
  content: 'hejhej',
  wrapReverse: true,
};
export const WrapGrid = (args) => (
  <C.WrapGrid {...args}>
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
  </C.WrapGrid>
);
WrapGrid.args = {
  content: 'hejhej',
  columnMinWidth: 500,
  gridGap: 20,
  stretchColumns: false,
};

export const Error = (args) => <Block.Error {...args}>{args.content}</Block.Error>;
Error.args = {
  title: 'title',
  content: 'hejhej',
  hideLeftBorder: false,
};

export const Warning = (args) => <Block.Warning {...args}>{args.content}</Block.Warning>;
Warning.args = {
  title: 'title',
  content: 'hejhej',
  hideLeftBorder: false,
};

export const Info = (args) => <Block.Info {...args}>{args.content}</Block.Info>;
Info.args = {
  title: 'title',
  content: 'hejhej',
  hideLeftBorder: false,
  withBottomMargin: false,
};

export const Emptystate = (args) => <Block.Emptystate {...args}>{args.content}</Block.Emptystate>;
Emptystate.args = {
  content: 'hejhej',
  title: 'title',
};

export const Accordion = (args) => (
  <Block.Accordion {...args} title="Hello" description="Desc">
    {() => (
      <>
        <p>hej</p>
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
      </>
    )}
  </Block.Accordion>
);
Accordion.args = {
  content: 'hejhej',
};

const SubnavigationTemplate = (args) => (
  <Block.SubnavigationBlock
    navigationList={[
      [
        { label: 'Other stuff', path: 'http://apple.com' },
        { label: 'Hidden stuff', path: 'http://apple.com', render: () => false },
      ],
      [
        { row: (<div>hello</div>) },
        args.iWontRender && {
          label: 'On call',
          path: 'http://google.com',
          isActive: true,
          iconStyle: { background: 'pink' },
          navigationStyle: { background: 'magenta' },
          labelStyle: { background: 'orange' },
        },
        { label: 'Im an active one', path: 'http://apple.com', isActive: true },
        { label: 'Hidden stuff', path: 'http://apple.com', render: () => false },
      ]]}
    {...args}
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

export const SubNavigation = SubnavigationTemplate.bind({});
SubNavigation.args = {
  iWontRender: false,
  title: 'Hello',
};
