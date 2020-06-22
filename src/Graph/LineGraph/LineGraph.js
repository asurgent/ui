import React from 'react';
import PropTypes from 'prop-types';
import * as Canvas from '../Canvas';
import Line from './Line';
import Zoom from '../Zoom';
import Dotts from './Dotts';
import * as Axis from '../Axis';
import ClipPath from '../ClipPath';


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
      <Zoom
        xScale={xScale}
        yScale={yScale}
        data={sortedData}
        yProp={yProp}
        xProp={xProp}
        dimensions={dimensions}
      >
        {(update) => (
          <>
            <Axis.XPrimary dimensions={dimensions} xScale={xScale} xProp={xProp} update={update} />
            <Axis.YPrimary dimensions={dimensions} yScale={yScale} yProp={yProp} update={update} />
            <Line
              xScale={xScale}
              yScale={yScale}
              data={sortedData}
              yProp={yProp}
              xProp={xProp}
              dimensions={dimensions}
              update={update}
            />
          </>
        )}
      </Zoom>
    )}
  </Canvas.Primary>
);


LineGraph.propTypes = propTypes;
LineGraph.defaultProps = defaultProps;

export default LineGraph;
