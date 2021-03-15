import React from 'react';
import * as Graph from './index';
import data from './data';
import data2 from './data2';
import data3 from './data3';

const Story = {
  title: 'Graphs/Line',
  component: Graph.LineGraph,
  argTypes: {},
};
export default Story;

export const LineGraph = (args) => (
  <>
    <div style={{ height: '200px' }}>
      <Graph.LineGraph data={[]} />
    </div>

    <div style={{ height: '200px' }}>
      <Graph.LineGraph data={data2} />
    </div>

    <div style={{ height: '200px' }}>
      <Graph.LineGraph
        data={data}
        {...args}
      />
    </div>

    <div style={{ height: '200px' }}>
      <Graph.LineGraph data={data3} {...args} markerLines={[{ value: 0.7, title: 'one', color: '#C62929' }]} />
    </div>
  </>
);
LineGraph.args = {
  xProp: 'timestamp',
  dataTitle: 'Special data set',
  markerLines: [
    { value: 50, title: 'one', color: '#C62929' },
    { value: 10, title: 'two', color: 'orange' },
    { value: 20, title: 'three', color: 'magenta' },
  ],
};

export const PlainGraph = (args) => (<Graph.PlainLineGraph data={data} {...args} />);
PlainGraph.args = {
  customDimensions: {
    height: 200,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
  },
};
