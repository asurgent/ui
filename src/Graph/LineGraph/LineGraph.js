import React from 'react';
import PropTypes from 'prop-types';
import * as Canvas from '../Canvas';
import Line from './Line';
import Dotts from './Dotts';


const propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  yProp: PropTypes.string,
  xProp: PropTypes.string,
};

const defaultProps = {
  xProp: 'date',
  yProp: 'value',
};

const LineGraph = ({ data, yProp, xProp }) => (
  <Canvas.Primary data={data} yProp={yProp} xProp={xProp}>
    {({
      yScale, xScale, dimensions, sortedData,
    }) => (
      <>


        <Line xScale={xScale} yScale={yScale} data={sortedData} yProp={yProp} xProp={xProp} dimensions={dimensions} />

        {/* <Dotts xScale={xScale} yScale={yScale} data={sortedData} yProp={yProp} xProp={xProp} /> */}


      </>
    )}
  </Canvas.Primary>
);


LineGraph.propTypes = propTypes;
LineGraph.defaultProps = defaultProps;

export default LineGraph;
