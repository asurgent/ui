import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import translation from './Legend.translation';
import * as C from './Legend.styled';

const propTypes = {
  legendCategories: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  cellSize: PropTypes.number,
  cellPadding: PropTypes.number,
  cellRadius: PropTypes.number,
};
const defaultProps = {
  legendCategories: null,
  cellSize: 18,
  cellPadding: 2,
  cellRadius: 1,
};

const { t } = translation;

const Legend = ({
  legendCategories,
  cellSize,
  cellPadding,
  cellRadius,
}) => {
  const legendRef = useRef(null);

  useEffect(() => {
    if (legendRef.current) {
      /* Legend container */
      const legend = d3.select(legendRef.current);
      legend
        .attr(
          'transform',
          // cellSize * vertical day-squares + top-margin
          `translate(680, ${(cellSize * 7) + 10})`,
        );

      /* legend squares */
      legend
        .selectAll('rect')
        .data(legendCategories)
        .enter()
        .append('rect')
        .attr('fill', (d) => d.color)
        .attr('x', (_, i) => (cellSize + cellPadding) * i)
        .attr('width', cellSize)
        .attr('height', cellSize)
        .attr('rx', cellRadius)
        .attr('ry', cellRadius);

      /* legend less-text */
      legend
        .append('text')
        .text(t('less', 'asurgentui'))
        .attr('font-size', 12)
        .attr('x', -45)
        .attr('y', 13);

      /* legend more-text */
      legend
        .append('text')
        .text(t('more', 'asurgentui'))
        .attr('font-size', 12)
        .attr('x', 110)
        .attr('y', 13);
    }
  }, [cellPadding, cellRadius, cellSize, legendCategories]);

  return (
    <C.Legend id="legend" ref={legendRef} />
  );
};

Legend.propTypes = propTypes;
Legend.defaultProps = defaultProps;

export default Legend;
