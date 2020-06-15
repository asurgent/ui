import React, {
  useRef,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import * as d3 from 'd3';
import { useChartDimensions } from './useChartDimensions';
import * as C from './LineGraph.styled';

const dataset = d3.range(570).map((d) => ({ y: d3.randomUniform(100)() }));

const chartSettings = {
  width: 600,
  height: 200,
};

const XAxis = ({ dimensions, xScale }) => {
  const domain = xScale.domain();
  const range = xScale.range();

  const pathData = useMemo(() => [
    'M', range[0], 6,
    'v', -6,
    'H', range[1],
    'v', 6,
  ].join(' '), [range]);

  const ticks = useMemo(() => {
    const scale = d3.scaleLinear()
      .domain(domain)
      .range(range);
    const width = range[1] - range[0];
    const pixelsPerTick = 30;
    const numberOfTicksTarget = Math.max(
      1,
      Math.floor(
        width / pixelsPerTick,
      ),
    );
    return scale.ticks(numberOfTicksTarget)
      .map((value) => ({
        value,
        xOffset: scale(value),
      }));
  }, [domain, range]);

  return (
    <C.XAxisGroup dimensions={dimensions}>
      <path
        d={pathData}
        fill="none"
        stroke="currentColor"
      />
      {ticks.map(({ value, xOffset }) => (
        <g
          key={value}
          transform={`translate(${xOffset}, 0)`}
        >
          <line
            y2="6"
            stroke="currentColor"
          />
          <text
            key={value}
            style={{
              fontSize: '10px',
              textAnchor: 'middle',
              transform: 'translateY(20px)',
            }}
          >
            { value }
          </text>
        </g>
      ))}
    </C.XAxisGroup>
  );
};

const Line = ({ xScale, yScale, data }) => {
  const line = useMemo(() => (
    d3.line()
      .x((d, i) => xScale(i)) // set the x values for the line generator
      .y((d) => yScale(d.y)) // set the y values for the line generator
      .curve(d3.curveMonotoneX)(data)
  ), [data, xScale, yScale]);

  return (
    <g>
      <C.Line d={line} />
    </g>
  );
};

const LineGraph = () => {
  const [ref, dimensions] = useChartDimensions(chartSettings);

  const xScale = useMemo(() => (
    d3.scaleLinear()
      .domain([0, 100])
      .range([0, dimensions.boundedWidth])
  ), [dimensions.boundedWidth]);

  const yScale = useMemo(() => (
    d3.scaleLinear()
      .domain([0, 100])
      .range([0, dimensions.boundedHeight])
  ), [dimensions.boundedHeight]);


  const plots = useMemo(() => (
    d3.line()
      .x((d, i) => xScale(i)) // set the x values for the line generator
      .y((d) => yScale(d.y)) // set the y values for the line generator
      .curve(d3.curveMonotoneX)(dataset)
  ), [xScale, yScale]);


  const yAxis = useMemo(() => (
    d3.scaleLinear()
      .domain([0, 100])
      .range([dimensions.boundedHeight, 0])
  ), [dimensions.boundedHeight]);


  return (
    <div ref={ref} style={{ height: '200px' }}>
      <svg width={dimensions.width} height={dimensions.height}>
        <C.ChartGroup dimensions={dimensions}>
          <C.Backdrop dimensions={dimensions} />
          <XAxis dimensions={dimensions} xScale={xScale} />
          <Line xScale={xScale} yScale={yScale} data={dataset} />


        </C.ChartGroup>
      </svg>
    </div>
  );
};

export default LineGraph;
