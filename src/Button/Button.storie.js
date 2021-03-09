import React from 'react';
import MdiIcon from '@mdi/react';
import { mdiTicketConfirmation } from '@mdi/js';
import {
  withKnobs, boolean, text,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import * as Button from './index';

const content = 'Button text ';

export default { title: 'UI Components|Buttons', decorators: [withKnobs] };

export const saveToFileButton = () => (
  <>
    <Button.Icon
      saveToFilename="some_file"
      tooltip="Saves from promise"
      saveToFile={() => new Promise((r) => r(['a', 'b']))}
      onClick={(e) => action('Clicked!')(e)}
      icon={(
        <MdiIcon
          path={mdiTicketConfirmation}
          size={1.4}
        />
      )}
    />
    <Button.Icon
      saveToFilename="another_file"
      tooltip="Saves from object"
      saveToFile={() => ['a', 'b']}
      onClick={(e) => action('Clicked!')(e)}
      icon={(
        <MdiIcon
          path={mdiTicketConfirmation}
          size={1.4}
        />
      )}
    />
  </>
);

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

export const primaryButton = () => (
  <Button.Primary loading={boolean('loading', true)} onClick={(e) => action('Clicked!')(e)}>{content}</Button.Primary>
);

export const secondaryButton = () => (
  <Button.Secondary onClick={(e) => action('Clicked!')(e)}>{content}</Button.Secondary>
);

export const hollowButton = () => (
  <Button.Hollow onClick={(e) => action('Clicked!')(e)}>{content}</Button.Hollow>
);

export const hrefButton = () => (
  <Button.Primary disabled link="https://google.com" onClick={(e) => action('Clicked!')(e)}>{content}</Button.Primary>
);

export const plainButton = () => (
  <Button.Plain onClick={(e) => action('Clicked!')(e)}>{content}</Button.Plain>
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

export const transparentButton = () => (
  <Button.Transparent onClick={(e) => action('Clicked!')(e)}>{content}</Button.Transparent>
);

export const rejectButton = () => (
  <Button.Reject onClick={(e) => action('Clicked!')(e)}>{content}</Button.Reject>
);

export const acceptButton = () => (
  <Button.Create style={{ padding: '4rem' }} onClick={(e) => action('Clicked!')(e)}>{content}</Button.Create>
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
