import React from 'react';
import PropTypes from 'prop-types';
import * as Canvas from '../Canvas';
import Line from './Line';
import Zoom from '../Zoom';
import * as Axis from '../Axis';

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
        <Zoom
          xScale={xScale}
          yScale={yScale}
          data={sortedData}
          yProp={yProp}
          xProp={xProp}
          dimensions={dimensions}
        >
          <Axis.XPrimary dimensions={dimensions} xScale={xScale} xProp={xProp} />
          <Axis.YPrimary dimensions={dimensions} yScale={yScale} yProp={yProp} />
          <Line
            xScale={xScale}
            yScale={yScale}
            data={sortedData}
            yProp={yProp}
            xProp={xProp}
            dimensions={dimensions}
          />
        </Zoom>
        {/* <Backdrop
          yProp={yProp}
          xProp={xProp}
          xScale={xScale}
          yScale={yScale}
          data={sortedData}
          dimensions={dimensions}
        /> */}
      </>
    )}
  </Canvas.Primary>
);


LineGraph.propTypes = propTypes;
LineGraph.defaultProps = defaultProps;

export default LineGraph;
