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

const Line = ({
  xScale,
  data,
  xProp,
  dimensions,
  setDomain,
  domain,
}) => {
  const ref = createRef();
  const { boundedWidth, boundedHeight } = dimensions;

  const brush = useMemo(() => d3.brushX()
    .extent([[0, 0], [boundedWidth, boundedHeight]]),
  [boundedHeight, boundedWidth]);

  const callback = useCallback(() => {
    const extent = d3.event.selection;

    if (!extent) {
      // if (!c) { }
      // xScale.domain
      setDomain(d3.extent(data, ({ [xProp]: x }) => x));
    } else {
      // xScale.domain
      setDomain([
        xScale.invert(extent[0]),
        xScale.invert(extent[1]),
      ]);

      d3.select(ref.current)
        .call(brush.move, null);
    }
  }, [brush.move, data, ref, setDomain, xProp, xScale]);

  useEffect(() => {
    brush.on('end', callback);
  }, [brush, callback]);

  useEffect(() => {
    d3.select(ref.current)
      .call(brush);
  }, [brush, ref]);

  return (<g ref={ref} />);
};

Line.propTypes = propTypes;
Line.defaultPtops = defaultPtops;

export default Line;
