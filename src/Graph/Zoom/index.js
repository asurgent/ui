import React, {
  useMemo, useCallback, useEffect, createRef, useState,
} from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

const propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  xScale: PropTypes.instanceOf(Object).isRequired,
  yScale: PropTypes.instanceOf(Object).isRequired,
  dimensions: PropTypes.instanceOf(Object).isRequired,
  yProp: PropTypes.string.isRequired,
  xProp: PropTypes.string.isRequired,
};

const defaultPtops = {};

const withDelayTimer = (action, timeout = 350) => {
  let timer = setTimeout(() => {}, timeout);
  return (...args) => {
    timer = setTimeout(() => {
      action(...args);
      clearTimeout(timer);
    }, timeout);
  };
};

const timer = (callback, msTimer) => () => withDelayTimer((...args) => {
  callback(...args);
}, msTimer);


const Line = ({
  xScale,
  data,
  xProp,
  dimensions,
  onBrush,
  children,
}) => {
  const ref = createRef();
  const { boundedWidth, boundedHeight } = dimensions;

  const brush = useMemo(() => d3.brushX()
    .extent([[0, 0], [boundedWidth, boundedHeight]]),
  [boundedHeight, boundedWidth]);

  const timeout = useMemo(timer((extent) => {
    if (!extent) {
      xScale.domain(d3.extent(data, ({ [xProp]: x }) => x));
    } else {
      xScale.domain([
        xScale.invert(extent[0]),
        xScale.invert(extent[1]),
      ]);

      d3.select(ref.current)
        .call(brush.move, null);
    }
    onBrush();
  }), [brush.move, data, ref, xProp, xScale]);

  const callback = useCallback(() => timeout(d3.event.selection), [timeout]);

  useEffect(() => {
    brush.on('end', callback);
  }, [brush, callback, timeout]);

  useEffect(() => {
    d3.select(ref.current)
      .call(brush);
  }, [brush, ref]);

  return (
    <>
      {children}
      <g ref={ref} />
    </>
  );
};

Line.propTypes = propTypes;
Line.defaultPtops = defaultPtops;

export default Line;
