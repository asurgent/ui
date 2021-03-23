/* eslint-disable react/destructuring-assignment */
import React from 'react';
import * as Moment from './index';

const Story = {
  title: 'Helpers/Moment',
  component: Moment,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};
export default Story;

const TemplateFull = (args) => <Moment.Full {...args} />;

export const FullDateTime = TemplateFull.bind({});
FullDateTime.args = {
  timestamp: '2020-01-15T13:30:45',
};

const TemplateDateTime = (args) => <Moment.DateTime {...args} />;
export const DateTime = TemplateDateTime.bind({});
DateTime.args = {
  timestamp: '2020-01-15T13:30:45+0200',
};

const TemplateDate = (args) => <Moment.Date {...args} />;
export const DateFormat = TemplateDate.bind({});
DateFormat.args = {
  timestamp: '2020-01-15T13:30:45+0200',
};

const DurationTemplate = (args) => (
  <Moment.Duration
    start={args.useDate ? args.start : false}
    end={args.useDate ? args.end : false}
    {...args}
  />
);
export const Duration = DurationTemplate.bind({});
Duration.args = {
  timestamp: '2020-01-15T13:30:45+0200',
  useDate: true,
  start: '2020-01-15T13:30:45+0200',
  end: '2020-01-18T11:20:45+0200',
  seconds: 15000,
};

const TimeAgoTemplate = (args) => <Moment.Ago {...args} />;
export const TimeAgo = TimeAgoTemplate.bind({});
TimeAgo.args = {
  timestamp: '2020-01-15T13:30:45+0200',
};

const CustomTemplate = (args) => <Moment.Custom {...args} />;
export const Custom = CustomTemplate.bind({});
Custom.args = {
  timestamp: '2020-01-15T13:30:45+0200',
  format: 'ddd MMM YYYY @ HH.mm',
};
