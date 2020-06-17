import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import moment from 'moment';
import { useChartDimensions } from './useChartDimensions';
import * as C from './Canvas.styled';

const propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  children: PropTypes.func.isRequired,
  customDimensions: PropTypes.instanceOf(Object),
  yProp: PropTypes.string.isRequired,
  xProp: PropTypes.string.isRequired,
};

const defaultProps = {
  customDimensions: {},
};

const Canvas = ({
  data, children, customDimensions, yProp, xProp,
}) => {
  const [ref, dimensions] = useChartDimensions(customDimensions);
  const [tooltip, setTooltip] = useState(null);

  const sortedData = useMemo(() => data
    .reduce((acc, item) => ([{
      ...item,
      [xProp]: moment(item[xProp]),
    }, ...acc]), [])
    .sort((a, b) => a[xProp] - b[xProp]), [data, xProp]);

  const bisect = useMemo(() => d3.bisector(({ [xProp]: x }) => x).left, [xProp]);

  const xScale = useMemo(() => (
    d3.scaleTime()
      .domain(d3.extent(sortedData, ({ [xProp]: x }) => x))
      .range([0, dimensions.boundedWidth])
  ), [sortedData, dimensions.boundedWidth, xProp]);

  const yScale = useMemo(() => {
    const [min, max] = d3.extent(sortedData, ({ [yProp]: y }) => y);

    return (
      d3.scaleLinear()
        .domain([Math.floor(min), Math.ceil(max)])
        .range([dimensions.boundedHeight, 0])
    );
  }, [dimensions.boundedHeight, sortedData, yProp]);

  const handleMouseMove = (e) => {
    const [x] = d3.clientPoint(e.target, e);
    const x0 = xScale.invert(x - 4);
    const index = bisect(sortedData, x0, 1);

    const targetData = sortedData[index];
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
    <div ref={ref} style={{ height: '200px' }}>
      <svg width={dimensions.width} height={dimensions.height}>
        <C.ChartGroup dimensions={dimensions}>
          <C.Backdrop
            onFocus={handleMouseMove}
            onBlur={handleMouseOut}
            onMouseMove={handleMouseMove}
            onMouseOver={handleMouseMove}
            onMouseOut={handleMouseOut}
            dimensions={dimensions}
          />
          { tooltip && (
            <>
              <line
                y1={dimensions.boundedHeight}
                y2={tooltip.cy}
                x1={tooltip.cx}
                x2={tooltip.cx}
                stroke="magenta"
              />
              <line
                x1="0"
                x2={tooltip.cx}
                y1={tooltip.cy}
                y2={tooltip.cy}
                stroke="magenta"
              />
            </>
          )}
          {children(yScale, xScale, dimensions, sortedData)}
        </C.ChartGroup>
      </svg>
    </div>
  );
};


Canvas.propTypes = propTypes;
Canvas.defaultProps = defaultProps;

export {
  Canvas as Primary,
};
