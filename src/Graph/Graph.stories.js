import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
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

const dataset2 = [
  {
    date: '2018-04-23',
    value: '0',
  },
  {
    date: '2018-04-24',
    value: '5',
  },
  {
    date: '2018-04-25',
    value: '10',
  },
  {
    date: '2018-04-26',
    value: '15',
  },
  {
    date: '2018-04-27',
    value: '5',
  },
  {
    date: '2018-04-28',
    value: '0',
  },
];


export const lineGraph = () => (
  <>
    <div style={{ height: '200px' }}>
      <Graph.Line data={dataset2} />
    </div>
    <div style={{ height: '200px' }}>
      <Graph.Line
        dataTitle="Special data set"
        data={dataset}
        markerLines={[{ value: 10000, title: 'Threashold', color: '#C62929' }]}
      />
    </div>
    <div style={{ height: '200px' }}>
      <Graph.Line
        data={data}
        xProp="timestamp"
        markerLines={[
          { value: 50, title: 'one', color: '#C62929' },
          { value: 10, title: 'two', color: 'orange' },
          { value: 20, title: 'three', color: 'magenta' },
        ]}
      />
    </div>
    <div style={{ height: '200px' }}>
      <Graph.Line data={data2} xProp="timestamp" />
    </div>
    <div style={{ height: '200px' }}>
      <Graph.Line data={data3} xProp="timestamp" markerLines={[{ value: 0.7, title: 'one', color: '#C62929' }]} />
    </div>
  </>
);
