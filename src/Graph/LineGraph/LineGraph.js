import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import * as Canvas from '../components/Canvas';
import Line from './Line';
import Zoom from '../components/Zoom';
import * as Axis from '../components/Axis';
import * as C from './LineGraph.styled';


const propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  yProp: PropTypes.string,
  xProp: PropTypes.string,
  duration: PropTypes.number,
  onTooltipEvent: PropTypes.func,
};

const defaultProps = {
  xProp: 'date',
  yProp: 'value',
  duration: 350,
  onTooltipEvent: () => {},
};

const LineGraph = ({
  data, yProp, xProp, duration, onTooltipEvent,
}) => {
  const handleTooltipData = useCallback((tooltip) => {
    onTooltipEvent(tooltip);
  }, [onTooltipEvent]);

  return (
    <Canvas.Primary data={data} yProp={yProp} xProp={xProp}>
      {({
        yScale, xScale, dimensions, sortedData,
      }) => (
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
          <C.Threashold
            y1={yScale(0.5)}
            y2={yScale(0.5)}
            x1={0}
            x2={dimensions.boundedWidth}
          />
        </Zoom>
      )}
    </Canvas.Primary>
  );
};


LineGraph.propTypes = propTypes;
LineGraph.defaultProps = defaultProps;

export default LineGraph;
