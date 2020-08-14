import React, {
  useEffect, createRef, useMemo, useState, useCallback,
} from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';


const propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  dimensions: PropTypes.instanceOf(Object).isRequired,
  xScale: PropTypes.instanceOf(Object).isRequired,
  yScale: PropTypes.instanceOf(Object).isRequired,
  yProp: PropTypes.string.isRequired,
  xProp: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  updateTick: PropTypes.number, // Passed from Zoom.js
};

const defaultProps = {
  updateTick: 0,
};


const withDelayTimer = (action, timeout) => {
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

// const height = 60;

const Context = ({
  xScale, yScale, data, xProp, yProp, dimensions,
}) => {
  const pathRef = createRef();
  const axisRef = createRef();
  const brushRef = createRef();
  const [disable, setDisable] = useState(true);
  const [update, setUpdate] = useState(0);


  const brush = useMemo(() => d3.brushX()
    .extent([[0, 0], [dimensions.boundedWidth, dimensions.contextheight]]),
  [dimensions.boundedWidth, dimensions.contextheight]);

  useEffect(() => {
    d3.select(brushRef.current)
      .call(brush);
  }, [brush, brushRef]);

  const timeout = useMemo(timer((extent) => {
    if (!extent) {
      xScale.domain([...d3.extent(data, ({ [xProp]: x }) => x)]);
    } else {
      xScale.domain([
        xScale.invert(extent[0]),
        xScale.invert(extent[1]),
      ]);
    }
    d3.select(brushRef.current)
      .call(brush.move, null);

    setUpdate(update + 1);
  }, 10), [brush.move, data, xProp, xScale]);

  const callbackEnd = useCallback(() => { timeout(d3.event.selection); }, [timeout]);
  const callbackStart = useCallback(() => { setDisable(true); }, []);

  useEffect(() => {
    brush.on('start', callbackStart);
    brush.on('end', callbackEnd);
  }, [brush, callbackEnd, callbackStart, timeout]);

  const area = useMemo(() => d3.area()
    .curve(d3.curveMonotoneX)
    .x(({ [xProp]: x }) => xScale(x))
    .y0(dimensions.contextheight)
    .y1(({ [yProp]: y }) => yScale(y)),
  [dimensions.contextheight, xProp, xScale, yProp, yScale]);


  useEffect(() => {
    d3.select(pathRef.current)
      .datum(data)
      .attr('class', 'area')
      .attr('d', area);
  }, [area, data, pathRef]);

  useEffect(() => {
    d3.select(axisRef.current)
      .attr('transform', `translate(0,${dimensions.contextHeight})`)
      .call(d3.axisBottom(xScale));
  }, [axisRef, dimensions.contextHeight, dimensions.contextheight, xScale]);

  return (
    <g transform={`translate(${dimensions.marginLeft},${dimensions.boundedHeight + 40})`}>
      <path ref={pathRef} />
      <g ref={axisRef} />
      <g ref={brushRef} />
      <g ref={brushRef} />
    </g>
  );
};


Context.propTypes = propTypes;
Context.defaultProps = defaultProps;

export default Context;
