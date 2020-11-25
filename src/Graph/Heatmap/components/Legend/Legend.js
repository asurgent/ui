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
          `translate(840, ${(cellSize * 7) + 30})`,
        );

      legend
        .selectAll('rect')
        .data(legendCategories)
        .enter()
        .append('rect')
        .attr('fill', (d) => d.color)
        .attr('x', (_, i) => cellSize * i)
        .attr('width', cellSize - cellPadding)
        .attr('height', cellSize - cellPadding)
        .attr('rx', cellRadius)
        .attr('ry', cellRadius);
    }
  }, [cellPadding, cellRadius, cellSize, legendCategories]);

  return (
    <C.Legend ref={legendRef}>
      <C.Text x={-45} y={13}>{t('less', 'asurgentui')}</C.Text>
      <C.Text x={110} y={13}>{t('more', 'asurgentui')}</C.Text>
    </C.Legend>
  );
};

Legend.propTypes = propTypes;
Legend.defaultProps = defaultProps;

export default Legend;
