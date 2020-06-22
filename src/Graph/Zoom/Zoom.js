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
  yScale,
  yProp,
  data,
  xProp,
  dimensions,
  children,
}) => {
  const ref = createRef();
  const [update, setUpdate] = useState(0);
  const [disable, setDisable] = useState(false);
  const [tooltip, setTooltip] = useState(null);

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
    }
    d3.select(ref.current)
      .call(brush.move, null);

    setTimeout(() => setDisable(false), 350);
    setUpdate(update + 1);
  }), [brush.move, data, ref, xProp, xScale]);

  const callbackEnd = useCallback(() => { timeout(d3.event.selection); }, [timeout]);
  const callbackStart = useCallback(() => { setDisable(true); setTooltip(null); }, []);

  useEffect(() => {
    brush.on('start', callbackStart);
    brush.on('end', callbackEnd);
  }, [brush, callbackEnd, callbackStart, timeout]);

  useEffect(() => {
    d3.select(ref.current)
      .call(brush);
  }, [brush, ref]);


  const bisect = useMemo(() => d3.bisector(({ [xProp]: x }) => x).left, [xProp]);

  const handleMouseMove = (e) => {
    if (!disable) {
      const [x] = d3.clientPoint(e.target, e);
      const x0 = xScale.invert(x);
      const dataPointIndex = bisect(data, x0, 1);

      const targetData = data[dataPointIndex];
      const result = {
        targetData,
        cx: xScale(targetData[xProp]),
        cy: yScale(targetData[yProp]),
      };

      setTooltip(result);
    }
  };

  const handleMouseOut = () => {
    if (!disable) {
      setTooltip(null);
    }
  };

  return (
    <>
      {
        React.Children.map(children,
          (child) => React.cloneElement(child, {
            /*
             The "update" state will be passed to child-compoenents to trigger a rerender.
             This will work alongside with createRef and notice a change and trigger
             the desired update-redraw function.
             I think, some kind of dark-magic makes it work anyway ¯\_(ツ)_/¯
            */
            update,
          }))
      }
      { tooltip && (
        <line
          strokeWidth={2}
          y1={dimensions.boundedHeight}
          y2={0}
          x1={tooltip.cx}
          x2={tooltip.cx}
          stroke="pink"
        />
      )}
      <g
        ref={ref}
        onFocus={handleMouseMove}
        onBlur={handleMouseOut}
        onMouseMove={handleMouseMove}
        onMouseOver={handleMouseMove}
        onMouseOut={handleMouseOut}
      />
    </>
  );
};

Zoom.propTypes = propTypes;
Zoom.defaultPtops = defaultPtops;

export default Zoom;
