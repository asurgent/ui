import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as C from './MarkerLine.styled';

const propTypes = {
  yScale: PropTypes.instanceOf(Object).isRequired,
  dimensions: PropTypes.instanceOf(Object).isRequired,
  markerLines: PropTypes.instanceOf(Array),
};

const defaultProps = {
  markerLines: [],
};

const MarkerLine = ({ yScale, markerLines, dimensions }) => {
  const threasholdLines = useMemo(() => {
    if (Array.isArray(markerLines)) {
      return markerLines.map((marker) => ({
        y0: yScale(marker.value || marker),
        color: marker.color || null,
      }));
    }
    if (markerLines instanceof Object && markerLines.value) {
      return [{
        y0: yScale(markerLines.value),
        color: markerLines.color || null,
      }];
    }
    if (Number.isInteger(markerLines)) {
      return [{ y0: yScale(markerLines), color: null }];
    }

    return [];
  }, [markerLines, yScale]);

  return (
    <>
      {threasholdLines.map(({ y0, color }) => (
        <C.MarkerLine
          key={y0}
          y1={y0}
          y2={y0}
          color={color}
          x1={0}
          x2={dimensions.boundedWidth}
        />
      ))}
    </>
  );
};


MarkerLine.propTypes = propTypes;
MarkerLine.defaultProps = defaultProps;

export default MarkerLine;
