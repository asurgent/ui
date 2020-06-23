import React from 'react';
import {
  withKnobs, number,
} from '@storybook/addon-knobs';
import * as Graph from './index';
import data from './data';
import data2 from './data2';
import data3 from './data3';

export default {
  title: 'UI Components|Graph',
  decorators: [withKnobs],
};
const dataset = [
  {
    date: '2018-04-14',
    value: '8140.71',
  },
  {
    date: '2018-04-15',
    value: '8338.42',
  },
  {
    date: '2018-04-16',
    value: '8371.15',
  },
  {
    date: '2018-04-17',
    value: '8285.96',
  },
  {
    date: '2018-04-18',
    value: '8197.8',
  },
  {
    date: '2018-04-19',
    value: '8298.69',
  },
  {
    date: '2018-04-20',
    value: '8880.23',
  },
  {
    date: '2018-04-21',
    value: '8997.57',
  },
  {
    date: '2018-04-22',
    value: '9001.64',
  },
  {
    date: '2018-04-23',
    value: '8958.55',
  },
];


export const lineGraph = () => (
  <>
    <Graph.Line data={dataset} threashold={8500} />
    <Graph.Line data={data} xProp="timestamp" threashold={60} />
    <Graph.Line data={data2} xProp="timestamp" />
    <Graph.Line data={data3} xProp="timestamp" threashold={0.7} />
  </>
);
