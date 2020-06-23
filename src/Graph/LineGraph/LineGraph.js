import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import * as Canvas from '../components/Canvas';
import Line from './Line';
import Zoom from '../components/Zoom';
import * as Axis from '../components/Axis';
import ClipPath from '../components/ClipPath';

const propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  yProp: PropTypes.string,
  xProp: PropTypes.string,
  duration: PropTypes.number,
  threashold: PropTypes.number,
  onTooltipEvent: PropTypes.func,
};

const defaultProps = {
  xProp: 'date',
  yProp: 'value',
  duration: 350,
  threashold: null,
  onTooltipEvent: () => {},
};

const LineGraph = ({
  data, yProp, xProp, duration, onTooltipEvent, threashold,
}) => {
  const handleTooltipData = useCallback((tooltip) => {
    onTooltipEvent(tooltip);
  }, [onTooltipEvent]);


  return (
    <Canvas.Primary data={data} yProp={yProp} xProp={xProp}>
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

            <Axis.XPrimary
              dimensions={dimensions}
              xScale={xScale}
              xProp={xProp}
              duration={duration}
            />
            <Axis.YPrimary
              dashedMarkerLine={threashold}
              dimensions={dimensions}
              yScale={yScale}
              yProp={yProp}
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
