import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import moment from 'moment';
import { useChartDimensions } from './useChartDimensions';
import * as C from './Canvas.styled';
import Backdrop from '../Backdrop';
import * as Axis from '../Axis';
import ClipPath from './ClipPath';

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
  data,
  children,
  customDimensions,
  yProp,
  xProp,
}) => {
  const [ref, dimensions] = useChartDimensions(customDimensions);

  const sortedData = useMemo(() => data
    .reduce((acc, item) => ([{
      ...item,
      [xProp]: moment(item[xProp]),
    }, ...acc]), [])
    .sort((a, b) => a[xProp] - b[xProp]), [data, xProp]);

  const [domain, setDomain] = useState(d3.extent(sortedData, ({ [xProp]: x }) => x));

  const xScale = useMemo(() => (
    d3.scaleTime()
      .domain(domain)
      .range([0, dimensions.boundedWidth])
  ), [dimensions.boundedWidth, domain]);

  const yScale = useMemo(() => {
    const [min, max] = d3.extent(sortedData, ({ [yProp]: y }) => y);

    return (
      d3.scaleLinear()
        .domain([Math.floor(min), Math.ceil(max)])
        .range([dimensions.boundedHeight, 0])
    );
  }, [dimensions.boundedHeight, sortedData, yProp]);


  return (
    <div ref={ref} style={{ height: '200px' }}>
      <svg width={dimensions.width} height={dimensions.height}>
        <defs />
        <C.ChartGroup dimensions={dimensions}>
          <Backdrop
            yProp={yProp}
            xProp={xProp}
            xScale={xScale}
            yScale={yScale}
            data={sortedData}
            customDimensions={dimensions}
          />
          <Axis.XPrimary dimensions={dimensions} xScale={xScale} xProp={xProp} domain={domain} />
          <Axis.YPrimary dimensions={dimensions} yScale={yScale} yProp={yProp} />
          <ClipPath dimensions={dimensions}>
            {children({
              yScale,
              xScale,
              dimensions,
              sortedData,
              domain,
              setDomain,
            })}
          </ClipPath>
        </C.ChartGroup>
      </svg>
    </div>
  );
};


Canvas.propTypes = propTypes;
Canvas.defaultProps = defaultProps;

export default Canvas;
