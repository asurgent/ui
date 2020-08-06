import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import * as C from './Backdrop.styled';

const propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  dimensions: PropTypes.instanceOf(Object).isRequired,
  yProp: PropTypes.string.isRequired,
  xProp: PropTypes.string.isRequired,
  yScale: PropTypes.instanceOf(Object).isRequired,
  xScale: PropTypes.instanceOf(Object).isRequired,
};

const defaultProps = {};

const Backdrop = ({
  data,
  yProp,
  xProp,
  yScale,
  xScale,
  dimensions,
}) => {
  const [tooltip, setTooltip] = useState(null);

  const bisect = useMemo(() => d3.bisector(({ [xProp]: x }) => x).left, [xProp]);

  const handleMouseMove = (e) => {
    const [x] = d3.clientPoint(e.target, e);
    const x0 = xScale.invert(x - 4);
    const dataPointIndex = bisect(data, x0, 1);

    const targetData = data[dataPointIndex];
    const result = {
      targetData,
      cx: xScale(targetData[xProp]),
      cy: yScale(targetData[yProp]),
    };

    setTooltip(result);
  };

  const handleMouseOut = () => {
    setTooltip(null);
  };

  return (
    <>
      <C.Backdrop
        onFocus={handleMouseMove}
        onBlur={handleMouseOut}
        onMouseMove={handleMouseMove}
        onMouseOver={handleMouseMove}
        onMouseOut={handleMouseOut}
        dimensions={dimensions}
      />
      { tooltip && (
        <line
          y1={dimensions.boundedHeight}
          y2={0}
          x1={tooltip.cx}
          x2={tooltip.cx}
          stroke="pink"
        />
      )}
    </>
  );
};

Backdrop.propTypes = propTypes;
Backdrop.defaultProps = defaultProps;

export default Backdrop;
