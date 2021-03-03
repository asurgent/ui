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
      const filtered = markerLines
        .filter((val) => val !== false);

      return filtered.map((marker) => ({
        key: marker.title,
        y0: yScale(marker.value),
        color: marker.color || null,
      }));
    }

    if (markerLines?.value) {
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
      {threasholdLines.map(({ y0, color, key }) => (
        <C.MarkerLine
          key={key}
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
