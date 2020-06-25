import React, {
  useMemo, useEffect, createRef,
} from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ClipPath from '../ClipPath';

const GridStyle = styled.g`
  line {
    stroke: lightgrey;
    stroke-opacity: 0.7;
    shape-rendering: crispEdges;
  }

  path {
    stroke-width: 0;
  }
`;

const propTypes = {
  xScale: PropTypes.instanceOf(Object).isRequired,
  yScale: PropTypes.instanceOf(Object).isRequired,
  dimensions: PropTypes.instanceOf(Object).isRequired,
  lines: PropTypes.number,
};

const defaultProps = {
  lines: 3,
};

const Grid = ({
  xScale,
  yScale,
  dimensions,
  lines,
}) => {
  const refX = createRef();
  const refY = createRef();
  const { boundedWidth, boundedHeight } = dimensions;

  const xLines = useMemo(() => d3.axisBottom(xScale)
    .ticks(lines)
    .tickSize(-boundedWidth)
    .tickFormat(''),
  [boundedWidth, lines, xScale]);

  const yLines = useMemo(() => d3.axisLeft(yScale)
    .ticks(lines)
    .tickSize(-boundedWidth)
    .tickFormat(''),
  [boundedWidth, lines, yScale]);

  useEffect(() => {
    d3.select(refY.current).call(yLines);
    d3.select(refX.current).call(xLines);
  }, [refX, refY, xLines, yLines]);

  return (
    <ClipPath dimensions={dimensions}>
      <GridStyle ref={refY} />
      <GridStyle ref={refX} transform={`translate(0,${boundedHeight})`} />
    </ClipPath>
  );
};

Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;

export default Grid;
