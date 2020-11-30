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

const centerOfLastSquare = () => {
  try {
    const lastSquare = d3.select('#squares rect:last-child');
    const x = parseInt(lastSquare.attr('x'), 10);
    const width = parseInt(lastSquare.attr('width'), 10);
    return x - (width / 2);
  } catch (e) {
    return 0;
  }
};

const Legend = ({
  legendCategories,
  cellSize,
  cellPadding,
  cellRadius,
}) => {
  const legendRef = useRef(null);

  useEffect(() => {
    if (legendRef.current) {
      const legendContainer = d3.select(legendRef.current);
      legendContainer
        .attr(
          'transform',
          // cellSize * vertical day-squares + top-margin
          `translate(${centerOfLastSquare()}, ${(cellSize * 7) + 30})`,
        );
      legendContainer
        .selectAll('rect')
        .data(legendCategories)
        .join('rect')
        .attr('fill', (d) => d.color)
        .attr('x', (_, i) => -100 + (cellSize * i))
        .attr('width', cellSize - cellPadding)
        .attr('height', cellSize - cellPadding)
        .attr('rx', cellRadius)
        .attr('ry', cellRadius);
    }
  }, [cellPadding, cellRadius, cellSize, legendCategories]);

  return (
    <C.Legend ref={legendRef}>
      <C.Text x={-140} y={13}>{t('less', 'asurgentui')}</C.Text>
      <C.Text x={0} y={13}>{t('more', 'asurgentui')}</C.Text>
    </C.Legend>
  );
};

Legend.propTypes = propTypes;
Legend.defaultProps = defaultProps;

export default Legend;
