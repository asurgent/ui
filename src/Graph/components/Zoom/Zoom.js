import React, {
  useMemo, useCallback, useEffect, createRef, useState, useLayoutEffect,
} from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

const propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  xScale: PropTypes.instanceOf(Object).isRequired,
  xProp: PropTypes.string.isRequired,
  dimensions: PropTypes.instanceOf(Object).isRequired,
  duration: PropTypes.number.isRequired,
  onTooltipEvent: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

const defaultProps = {};

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

const Zoom = ({
  xScale,
  data,
  xProp,
  dimensions,
  children,
  onTooltipEvent,
  duration,
}) => {
  const ref = createRef();
  const [update, setUpdate] = useState(0);
  const [disable, setDisable] = useState(true);
  const [tooltip, setTooltip] = useState(null);

  const { boundedWidth, boundedHeight } = dimensions;

  const brush = useMemo(() => d3.brushX()
    .extent([[0, 0], [boundedWidth, boundedHeight]]),
  [boundedHeight, boundedWidth]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

    setTimeout(() => setDisable(false), duration);
    setUpdate(update + 1);
  }, duration), [brush.move, data, ref, xProp, xScale]);

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

  useLayoutEffect(() => {
    setTimeout(() => setDisable(false), duration);
  }, [duration]);

  useLayoutEffect(() => {
    if (data.length >= 1) {
      const index = Math.floor(data.length / 2);
      const targetData = data[index];
      const result = {
        targetData,
        cx: xScale(targetData[xProp]),
      };
      onTooltipEvent(result);
      setTooltip(result);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, xScale]);

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
      };
      onTooltipEvent(result);
      setTooltip(result);
    }
  };

  return (
    <>
      {
        React.Children.map(children,
          (child) => child && React.cloneElement(child, {
            /*
             The "update" state will be passed as "updateTick"-prop to
             child-compoenents to trigger a rerender.
             This will work alongside with createRef and notice a change
            and trigger the desired update-redraw function.
             I think, some kind of dark-magic makes it work anyway ¯\_(ツ)_/¯
            */
            updateTick: update || 0,
          }))
      }
      { tooltip && (
        <line
          strokeWidth={1}
          y1={dimensions.boundedHeight}
          y2={0}
          x1={tooltip.cx}
          x2={tooltip.cx}
          stroke="#cab83a"
        />
      )}
      <g
        ref={ref}
        onFocus={handleMouseMove}
        onMouseMove={handleMouseMove}
        onMouseOver={handleMouseMove}
      />
    </>
  );
};

Zoom.propTypes = propTypes;
Zoom.defaultProps = defaultProps;

export default Zoom;
