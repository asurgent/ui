import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import * as Canvas from '../components/Canvas';
import Zoom from '../components/Zoom';
import * as Axis from '../components/Axis';
import ClipPath from '../components/ClipPath';
import Grid from '../components/Grid';
import Line from '../components/Line';
import MarkerLine from '../components/MarkerLine';

import * as C from './LineGraph.styled';

const propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  yProp: PropTypes.string,
  xProp: PropTypes.string,
  dataTitle: PropTypes.string,
  duration: PropTypes.number,
  gridLines: PropTypes.number,
  markerLines: PropTypes.instanceOf(Array),
};

const defaultProps = {
  xProp: 'date',
  yProp: 'value',
  dataTitle: '',
  duration: 350,
  gridLines: 3,
  markerLines: [],
};

const LineGraph = ({
  data,
  yProp,
  xProp,
  duration,
  markerLines,
  dataTitle,
  gridLines,
}) => {
  const [tooltip, setTooltip] = useState({});
  const handleTooltipData = useCallback((event) => {
    if (event?.targetData) {
      setTooltip(event.targetData);
    }
  }, []);


  return (
    <C.Wrapper>
      <C.Graph>
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
      </C.Graph>
      <C.Stats>
        <C.Stat>
          <b>{dataTitle || 'Hover data'}</b>
          {tooltip[yProp]}
        </C.Stat>
        {markerLines && markerLines.map((marker) => (
          <C.Stat key={marker.title} color={marker.color}>
            <b>{marker.title}</b>
            {marker.value}
          </C.Stat>
        ))}
      </C.Stats>
    </C.Wrapper>
  );
};


LineGraph.propTypes = propTypes;
LineGraph.defaultProps = defaultProps;

export default LineGraph;
