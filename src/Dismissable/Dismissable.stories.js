import React from 'react';
import * as Dismissable from './index';

export default {
  title: 'Components/Dismissable',
  // autosets types and necc for descriptions given in proptypes, 
  // otherwise use like argTypes: {id: {control: 'text', description: 'desc'}}
  component: Dismissable.Primary, 
  argTypes: {
    id: {control: 'text', },
    title: {control: 'text'},
    fadeOutSpeed: {control: 'number'}
  },
};

const Template = (args) => (
  <Dismissable.Plain {...args} id={args.id} title={args.title}>
    <p>some content {args.title}</p>
  </Dismissable.Plain>
);

export const Plain = Template.bind({});
Plain.args = {
  id: 'some.banner.id',
  title: 'I am a title',
  fadeOutSpeed: 500
};

export const Primary = (args) => (
    <>
      <Dismissable.Primary {...args} withBottomMargin>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <p>some content</p>
          <button type="button">some button</button>
        </div>
      </Dismissable.Primary>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <p>Not part of component (just for the sake of the Storybook)</p>
        <button type="button" onClick={() => window.localStorage.removeItem(args.id)}>Clear ID-value (refresh)</button>
      </div>
    </>
  );

Primary.args = {
  id: 'banner.storybook.primary',
  title: 'I am a title',
  description: 'I am some description',
  fadeOutSpeed: 500
};