import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import * as Canvas from '../components/Canvas';
import Line from './Line';
import Zoom from '../components/Zoom';
import * as Axis from '../components/Axis';
import ClipPath from '../components/ClipPath';
import Grid from '../components/Grid';
import MarkerLine from '../components/MarkerLine';

const propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  yProp: PropTypes.string,
  xProp: PropTypes.string,
  duration: PropTypes.number,
  gridLines: PropTypes.number,
  markerLines: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.instanceOf(Array),
  ]),
  onTooltipEvent: PropTypes.func,
};

const defaultProps = {
  xProp: 'date',
  yProp: 'value',
  duration: 350,
  gridLines: 3,
  markerLines: null,
  onTooltipEvent: () => {},
};

const LineGraph = ({
  data,
  yProp,
  xProp,
  duration,
  markerLines,
  gridLines,
  onTooltipEvent,
}) => {
  const handleTooltipData = useCallback((tooltip) => {
    onTooltipEvent(tooltip);
  }, [onTooltipEvent]);

  return (
    <Canvas.Primary
      data={data}
      yProp={yProp}
      xProp={xProp}
      markerLines={markerLines}
    >
      {({
        yScale,
        xScale,
        dimensions,
        sortedData,
      }) => (
        <ClipPath dimensions={dimensions} outer>
          <Zoom
            duration={duration}
            xScale={xScale}
            yScale={yScale}
            data={sortedData}
            yProp={yProp}
            xProp={xProp}
            dimensions={dimensions}
            onTooltipEvent={handleTooltipData}
          >
            <Grid
              dimensions={dimensions}
              lines={gridLines}
              yScale={yScale}
              xScale={xScale}
            />
            <Axis.XPrimary
              dimensions={dimensions}
              xScale={xScale}
              xProp={xProp}
              duration={duration}
            />
            <Axis.YPrimary
              dimensions={dimensions}
              yScale={yScale}
              yProp={yProp}
            />
            <MarkerLine
              markerLines={markerLines}
              dimensions={dimensions}
              yScale={yScale}
            />
            <Line
              duration={duration}
              xScale={xScale}
              yScale={yScale}
              data={sortedData}
              yProp={yProp}
              xProp={xProp}
              dimensions={dimensions}
            />
          </Zoom>
        </ClipPath>
      )}
    </Canvas.Primary>
  );
};


LineGraph.propTypes = propTypes;
LineGraph.defaultProps = defaultProps;

export default LineGraph;
