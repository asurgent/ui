import React, {
  useMemo, useCallback, useEffect, createRef, useState,
} from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

const propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  xScale: PropTypes.instanceOf(Object).isRequired,
  dimensions: PropTypes.instanceOf(Object).isRequired,
  xProp: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
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

const Zoom = ({
  xScale,
  data,
  xProp,
  dimensions,
  children,
}) => {
  const ref = createRef();
  const [update, setUpdate] = useState(0);
  const { boundedWidth, boundedHeight } = dimensions;

  const brush = useMemo(() => d3.brushX()
    .extent([[0, 0], [boundedWidth, boundedHeight]]),
  [boundedHeight, boundedWidth]);

  const timeout = useMemo(timer((extent) => {
    if (!extent) {
      xScale.domain([...d3.extent(data, ({ [xProp]: x }) => x)]);
    } else {
      xScale.domain([
        xScale.invert(extent[0]),
        xScale.invert(extent[1]),
      ]);
      d3.select(ref.current)
        .call(brush.move, null);
    }

    setUpdate(update + 1);
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
      {children(update)}
      <g ref={ref} />
    </>
  );
};

Zoom.propTypes = propTypes;
Zoom.defaultPtops = defaultPtops;

export default Zoom;
