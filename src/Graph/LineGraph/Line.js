import React, {
  useMemo, useEffect, createRef, useCallback,
} from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import * as C from './LineGraph.styled';
import Zoom from '../Zoom';

const propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  xScale: PropTypes.instanceOf(Object).isRequired,
  yScale: PropTypes.instanceOf(Object).isRequired,
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
  // console.log(onBrush);


  const handleBrush = useCallback(() => {
    d3.select(ref.current)
      .select('.line')
      .datum(data)
      .transition()
      .duration(1000)
      .attr('d', line);
  }, [data, line, ref]);

  useEffect(handleBrush, [data, line, ref, xScale]);

  return (
    <>
      <g ref={ref}>
        <C.Line className="line" />
      </g>
      <Zoom xScale={xScale} yScale={yScale} data={data} yProp={yProp} xProp={xProp} dimensions={dimensions} onBrush={handleBrush} />
    </>
  );
};

Line.propTypes = propTypes;
Line.defaultPtops = defaultPtops;

export default Line;
