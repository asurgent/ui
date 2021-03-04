import React from 'react';
import PropTypes from 'prop-types';
import * as Canvas from '../components/Canvas';
import ClipPath from '../components/ClipPath';
import Line from '../components/Line';

const propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  customDimensions: PropTypes.instanceOf(Object),
  yProp: PropTypes.string,
  xProp: PropTypes.string,
  duration: PropTypes.number,
};

const defaultProps = {
  xProp: 'date',
  yProp: 'value',
  duration: 350,
  customDimensions: {},
};

const LineGraph = ({
  data,
  yProp,
  xProp,
  duration,
  customDimensions,
}) => {
  if (!data && data.length === 0) {
    return null;
  }
  return (
    <Canvas.Primary
      data={data}
      yProp={yProp}
      xProp={xProp}
      customDimensions={customDimensions}
    >
      {({
        yScale,
        xScale,
        dimensions,
        sortedData,
      }) => (
        <ClipPath dimensions={dimensions} outer>
          <Line
            duration={duration}
            xScale={xScale}
            yScale={yScale}
            data={sortedData}
            yProp={yProp}
            xProp={xProp}
            dimensions={dimensions}
          />
        </ClipPath>
      )}
    </Canvas.Primary>
  );
};

LineGraph.propTypes = propTypes;
LineGraph.defaultProps = defaultProps;

export default LineGraph;
