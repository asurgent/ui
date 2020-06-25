import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as C from './MarkerLine.styled';

const propTypes = {
  yScale: PropTypes.instanceOf(Object).isRequired,
  dimensions: PropTypes.instanceOf(Object).isRequired,
  markerLines: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.instanceOf(Array),
  ]),
};

const defaultProps = {
  markerLines: [],
};

const MarkerLine = ({ yScale, markerLines, dimensions }) => {
  const threasholdLines = useMemo(() => {
    if (Array.isArray(markerLines)) {
      return markerLines.map((marker) => yScale(marker));
    }
    if (Number.isInteger(markerLines)) {
      return [yScale(markerLines)];
    }
    return [];
  }, [markerLines, yScale]);

  return (
    <>
      {threasholdLines.map((marker) => (
        <C.DashedLine
          key={marker}
          y1={marker}
          y2={marker}
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
