import React from 'react';
import * as Graph from './index';
import heatData from './data4';

const Story = {
  title: 'Graphs/Heatmap',
  component: Graph,
  argTypes: {},
};
export default Story;

export const Heatmap = (args) => {
  const numberOfDays = 365;

  const primaryData = heatData(numberOfDays);
  const secondaryData = heatData(numberOfDays);

  return (
    <div style={{
      border: '1px solid #dadada',
      borderRadius: '5px',
      marginTop: '20rem',
      width: '80vw',
    }}
    >
      <Graph.Heatmap
        primaryData={primaryData}
        secondaryData={secondaryData}
        borderColor="#133A5D"
        primaryLabel="fails"
        secondaryLabel="successes"
        cellGap={3}
        {...args}
      />
    </div>

  );
};
Heatmap.argTypes = {
  steps: 5,
  color: '#C6403B',
  emptyColor: '#F2F2F2',
  cellGap: 6,
  showLegend: true,
};
