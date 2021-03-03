import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import * as Canvas from '../components/Canvas';
import Zoom from '../components/Zoom';
import * as Axis from '../components/Axis';
import ClipPath from '../components/ClipPath';
import Grid from '../components/Grid';
import Line from '../components/Line';
import MarkerLine from '../components/MarkerLine';
import translation from './PlainLineGraph.translation';
import * as C from './PlainLineGraph.styled';

const { t } = translation;

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
