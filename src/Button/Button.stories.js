/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import MdiIcon from '@mdi/react';
import { mdiTicketConfirmation } from '@mdi/js';
import * as Button from './index';

const Story = {
  title: 'Components/Buttons',
  component: Button,
  argTypes: {
    onClick: () => console.log('asdfasdf'),
    content: 'Button text',
    tooltipOrientation: {
      control: { type: 'radio', options: ['middle', 'left', 'right'] },
    },
  },
};
export default Story;

export const SaveToFile = (args) => (
  <>
    <Button.Icon
      saveToFilename="some_file"
      tooltip="Saves from promise"
      saveToFile={() => new Promise((r) => r(['a', 'b']))}
      icon={<MdiIcon path={mdiTicketConfirmation} size={1.4} />}
      {...args}
    />
    <Button.Icon
      saveToFilename="another_file"
      tooltip="Saves from object"
      saveToFile={() => ['a', 'b']}
      icon={<MdiIcon path={mdiTicketConfirmation} size={1.4} />}
      {...args}
    />
  </>
);
SaveToFile.args = {
  onClick: () => console.log('clicked'),
};

const PrimaryTemplate = (args) => <Button.Primary {...args}>{args.content}</Button.Primary>;

export const Primary = PrimaryTemplate.bind({});
Primary.args = {
  loading: false,
  onClick: () => console.log('clicked'),
  content: 'knapp',
};

export const HREF = PrimaryTemplate.bind({});
HREF.args = {
  disabled: true,
  link: 'https://google.com',
  onClick: () => console.log('clicked'),
  content: 'knapp',
};

export const Secondary = (args) => (
  <Button.Secondary {...args}>{args.content}</Button.Secondary>
);
Secondary.args = {
  loading: false,
  onClick: () => console.log('clicked'),
  content: 'knapp',
};

export const Hollow = (args) => (<Button.Hollow {...args}>{args.content}</Button.Hollow>);
Hollow.args = {
  loading: false,
  onClick: () => console.log('clicked'),
  content: 'knapp',
};

export const Reject = (args) => (<Button.Reject {...args}>{args.content}</Button.Reject>);
Reject.args = {
  loading: false,
  onClick: () => console.log('clicked'),
  content: 'knapp',
};

export const Accept = (args) => (<Button.Accept {...args}>{args.content}</Button.Accept>);
Accept.args = {
  loading: false,
  onClick: () => console.log('clicked'),
  content: 'knapp',
};

export const Plain = (args) => (<Button.Plain {...args}>{args.content}</Button.Plain>);
Plain.args = {
  loading: false,
  onClick: () => console.log('clicked'),
  content: 'knapp',
};

export const Transparent = (args) => (
  <Button.Transparent {...args}>
    {args.content}
  </Button.Transparent>
);
Transparent.args = {
  loading: false,
  onClick: () => console.log('clicked'),
  content: 'knapp',
};

export const Create = (args) => (<Button.Create {...args}>{args.content}</Button.Create>);
Create.args = {
  loading: false,
  onClick: () => console.log('clicked'),
  content: 'knapp',
};

export const Pill = (args) => (<Button.Pill {...args}>{args.content}</Button.Pill>);
Pill.args = {
  loading: false,
  onClick: () => console.log('clicked'),
  content: 'knapp',
};

export const Icon = (args) => (
  <Button.Icon iconRight={args.icon} {...args}>
    {args.content}
  </Button.Icon>
);
Icon.args = {
  loading: false,
  onClick: () => console.log('clicked'),
  content: 'knapp',
  icon: <MdiIcon path={mdiTicketConfirmation} size={1.4} />,
};

export const Stretched = (args) => (
  <Button.Stretched
    iconRight={<MdiIcon path={mdiTicketConfirmation} size={1.4} />}
    {...args}
  >
    {args.content}
  </Button.Stretched>
);
Stretched.args = {
  link: '/sdf/2',
  content: 'knapp',
  onClick: (e) => console.log('Clicked!', e),
};

export const IconButton = (args) => (
  <Button.Icon
    icon={<MdiIcon path={mdiTicketConfirmation} size={1.4} />}
    {...args.content}
  />
);
IconButton.args = {
  tooltip: 'Hello',
  content: 'knapp',
  saveLinkState: true,
  link: '/test',
  onClick: (e) => console.log('Clicked!', e),
};

export const Link = (args) => (
  <Button.Link icon={<MdiIcon path={mdiTicketConfirmation} size={1.4} />}>
    {args.content}
  </Button.Link>
);
Link.args = {
  content: 'knapp',
  link: '/test',
  onClick: (e) => console.log('Clicked!', e),
};

export const Submit = (args) => (
  <form onSubmit={(e) => {
    e.preventDefault();
    console.log('Submit with submit-button', e);
  }}
  >
    <Button.Primary type="submit">{args.content}</Button.Primary>
  </form>
);
Submit.args = {
  content: 'knapp',
};

export const CreateBlock = (args) => (
  <Button.CreateBlock
    iconLeft={(
      <MdiIcon
        path={mdiTicketConfirmation}
        size={1.4}
      />
    )}
  >
    {args.content}
  </Button.CreateBlock>
);
CreateBlock.args = {
  content: 'knapp',
  link: '/sdf/2',
  onClick: (e) => console.log('Clicked!', e),
};

export const TooltipButton = (args) => (
  <Button.Primary {...args}>
    {args.content}
  </Button.Primary>
);
TooltipButton.args = {
  content: 'knapp',
  tooltip: 'hello',
  onClick: (e) => console.log('clicked', e),
  tooltipOrientation: 'middle',
};

export const SetTableState = (args) => {
  const state = {
    search: 'asd',
    sort: 'timestamp-asc',
    page: 1,
    filter: {
      timestamp: [['2121-12-12', 'eq']],
    },
  };

  return (
    <Button.Primary setTableState={{ key: state }} {...args}>
      {args.content}
    </Button.Primary>
  );
};
SetTableState.args = {
  link: '/123/12',
  content: 'knapp',
};
