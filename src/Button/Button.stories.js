import React from 'react';
import MdiIcon from '@mdi/react';
import { mdiTicketConfirmation } from '@mdi/js';
import * as Button from './index';

const Story = {
  title: 'Components/Buttons',
  component: Button,
  argTypes: {
    onClick: () => console.log('asdfasdf'),
    content: 'Button text'
  },
};
export default Story;

export const SaveToFile = (args) => (
  <>
    <Button.Plain
      saveToFilename="some_file"
      tooltip="Saves from promise"
      saveToFile={() => new Promise((r) => r(['a', 'b']))}
      onClick={(e) => args.onClick('clicked', e)}
      icon={<MdiIcon path={mdiTicketConfirmation} size={1.4}/>}
    />
    <Button.Plain
      saveToFilename="another_file"
      tooltip="Saves from object"
      saveToFile={() => ['a', 'b']}
      onClick={(e) => args.onClick('clicked', e)}
      icon={<MdiIcon path={mdiTicketConfirmation} size={1.4}/>}
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
  content: 'knapp'
};

export const HREF = PrimaryTemplate.bind({});
HREF.args = {
  disabled: true,
  link: "https://google.com",
  onClick: () => console.log('clicked'),
  content: 'knapp'
}

export const Secondary = (args) => (
  <Button.Secondary {...args}>{args.content}</Button.Secondary>
);
Secondary.args = {
  loading: false,
  onClick: () => console.log('clicked'),
  content: 'knapp'
};

export const Hollow = (args) => (<Button.Hollow {...args}>{args.content}</Button.Hollow>);
Hollow.args = {
  loading: false,
  onClick: () => console.log('clicked'),
  content: 'knapp'
}

export const Reject = (args) => (<Button.Reject {...args}>{args.content}</Button.Reject>);
Reject.args = {
  loading: false,
  onClick: () => console.log('clicked'),
  content: 'knapp'
}

export const Accept = (args) => (<Button.Accept {...args}>{args.content}</Button.Accept>);
Accept.args = {
  loading: false,
  onClick: () => console.log('clicked'),
  content: 'knapp'
}

export const Plain = (args) => (<Button.Plain {...args}>{args.content}</Button.Plain>);
Plain.args = {
  loading: false,
  onClick: () => console.log('clicked'),
  content: 'knapp'
}

export const Transparent = (args) => (<Button.Transparent {...args}>{args.content}</Button.Transparent>);
Transparent.args = {
  loading: false,
  onClick: () => console.log('clicked'),
  content: 'knapp'
}

export const Create = (args) => (<Button.Create {...args}>{args.content}</Button.Create>);
Create.args = {
  loading: false,
  onClick: () => console.log('clicked'),
  content: 'knapp'
}

export const Pill = (args) => (<Button.Pill {...args}>{args.content}</Button.Pill>);
Pill.args = {
  loading: false,
  onClick: () => console.log('clicked'),
  content: 'knapp'
}

export const Icon = (args) => (<Button.Icon iconRight={args.icon} {...args}>{args.content}</Button.Icon>);
Icon.args = {
  loading: false,
  onClick: () => console.log('clicked'),
  content: 'knapp',
  icon: <MdiIcon path={mdiTicketConfirmation} size={1.4}/>
}

/* 
export const setTableState = () => {
  const state = {
    search: 'asd',
    sort: 'timestamp-asc',
    page: 1,
    filter: {
      timestamp: [['2121-12-12', 'eq']],
    },
  };

  return (
    <Button.Primary link="/123/12" setTableState={{ key: state }}>
      Test link
    </Button.Primary>
  );
};

export const iconButton = () => (
  <Button.Icon
    tooltip="Hello"
    saveLinkState
    link="/test"
    onClick={(e) => action('Clicked!')(e)}
    icon={(
      <MdiIcon
        path={mdiTicketConfirmation}
        size={1.4}
      />
    )}
  />
);

export const submitButton = () => (
  <form onSubmit={(e) => {
    e.preventDefault();
    action('Submit')('Submit with submit-button', e);
  }}
  >
    <Button.Primary type="submit">{content}</Button.Primary>
  </form>
);



export const linkButton = () => (
  <Button.Link
    onClick={(e) => action('Clicked!')(e)}
    iconLeft={(
      <MdiIcon
        path={mdiTicketConfirmation}
        size={1.4}
      />
    )}
  >
    {content}

  </Button.Link>
);


export const pillButton = () => (
  <Button.Pill
    onClick={(e) => action('Clicked!')(e)}
    iconRight={(
      <MdiIcon
        path={mdiTicketConfirmation}
        size={1.4}
      />
    )}
  >
    {content}
  </Button.Pill>
);

export const createBlock = () => (
  <Button.CreateBlock
    link="/sdf/2"
    onClick={(e) => action('Clicked!')(e)}
    iconLeft={(
      <MdiIcon
        path={mdiTicketConfirmation}
        size={1.4}
      />
    )}
  >
    {content}
  </Button.CreateBlock>
);

export const Stretched = () => (
  <Button.Stretched
    link="/sdf/2"
    onClick={(e) => action('Clicked!')(e)}
    iconRight={(
      <MdiIcon
        path={mdiTicketConfirmation}
        size={1.4}
      />
    )}
  >
    {content}
  </Button.Stretched>
);

export const tooltipButton = () => (
  <Button.Primary tooltip="hello" tooltipOrientation={text('orientation (middle,left,right)', 'middle')} onClick={(e) => action('Clicked!')(e)}>
    {content}
  </Button.Primary>
);
 */