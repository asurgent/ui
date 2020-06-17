import React, {
  useMemo, useCallback, useEffect, createRef,
} from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import * as C from './LineGraph.styled';

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
  xScale, yScale, data, yProp, xProp, dimensions,
}) => {
  const ref = createRef();
  const line = useMemo(() => (
    d3.line()
      .x(({ [xProp]: x }) => xScale(x))
      .y(({ [yProp]: y }) => yScale(y))
  ), [xProp, xScale, yProp, yScale]);

  const brush = useMemo(() => {
    const { boundedWidth, boundedHeight } = dimensions;
    const domain = [boundedWidth, boundedHeight];

    return d3.brushX()
      .extent([[0, 0], domain]);
  }, [dimensions]);


  const callback = useCallback(() => {
    const extent = d3.event.selection;

    if (!extent) {
      xScale.domain(d3.extent(data, ({ [xProp]: x }) => x));
    } else {
      xScale.domain([
        xScale.invert(extent[0]),
        xScale.invert(extent[1]),
      ]);
      // d3.select(ref.current)
      //   .select('.brush')
      //   .call(brush.move, null);
    }

    d3.select(ref.current)
      .select('.line')
      .datum(data)
      .transition()
      .duration(1000)
      .attr('d', line);
  }, [data, line, ref, xProp, xScale]);

  useEffect(() => {
    brush.on('end', callback);
  }, [brush, callback]);

  useEffect(() => {
    d3.select(ref.current)
      .select('.brush')
      .call(brush);
  }, [brush, ref]);

  useEffect(() => {
    d3.select(ref.current)
      .select('.line')
      .datum(data)
      .attr('d', line);
  }, [data, line, ref, xScale]);

  return (
    <g ref={ref} clipPath="url(#clip)">
      <C.Line className="line" d={line} />
      <g className="brush" />
    </g>
  );
};

Line.propTypes = propTypes;
Line.defaultPtops = defaultPtops;

export default Line;
