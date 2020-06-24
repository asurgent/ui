import React, { useMemo, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import * as C from './Axis.styled';

const propTypes = {
  yScale: PropTypes.instanceOf(Object).isRequired,
  dimensions: PropTypes.instanceOf(Object).isRequired,
  dashedMarkerLine: PropTypes.number,
};

const defaultProps = {
  dashedMarkerLine: null,
};

const YLinearAxis = ({ yScale, dashedMarkerLine, dimensions }) => {
  const ref = createRef();


  const threasholdLine = useMemo(() => {
    if (dashedMarkerLine) {
      return yScale(dashedMarkerLine);
    }
    return null;
  }, [dashedMarkerLine, yScale]);

  const ticks = useMemo(() => d3.axisLeft(yScale)
    .tickFormat((tickVal) => (
      tickVal >= 1000 ? `${tickVal / 1000}K` : tickVal
    )),
  [yScale]);

  useEffect(() => {
    d3.select(ref.current)
      .call(ticks);
  }, [ref, ticks, yScale]);

  return (
    <>
      <g ref={ref} />
      {dashedMarkerLine !== null && (
        <C.DashedLine
          y1={threasholdLine}
          y2={threasholdLine}
          x1={0}
          x2={dimensions.boundedWidth}
        />
      )}
    </>
  );
};


YLinearAxis.propTypes = propTypes;
YLinearAxis.defaultProps = defaultProps;

export default YLinearAxis;
