import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import translation from './Legend.translation';
import * as C from './Legend.styled';

const propTypes = {
  legendCategories: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  cellSize: PropTypes.number,
  cellGap: PropTypes.number,
  steps: PropTypes.number,
};
const defaultProps = {
  legendCategories: null,
  cellSize: 18,
  cellGap: 1,
  steps: 5,
};

const { t } = translation;

const centerOfLastSquare = () => {
  try {
    const lastSquare = d3.select('#squares rect:last-child');
    const x = parseInt(lastSquare.node().getAttribute('x'), 10);
    return x;
  } catch (e) {
    return 0;
  }
};

const Legend = ({
  legendCategories,
  cellSize,
  cellGap,
  steps,
}) => {
  const legendRef = useRef(null);
  const widthOfSquares = -(steps * (cellSize + cellGap));
  useEffect(() => {
    if (legendRef.current) {
      const legendContainer = d3.select(legendRef.current);

      legendContainer
        .attr(
          'transform',
          `translate(${centerOfLastSquare() - 20}, ${((cellSize + cellGap) * 7) + 30})`,
        );
      legendContainer
        .selectAll('rect')
        .data(legendCategories)
        .join('rect')
        .attr('fill', (d) => d.color)
        .attr('x', (_, i) => widthOfSquares - 10 + ((cellSize + cellGap) * i))
        .attr('width', cellSize)
        .attr('height', cellSize);
    }
  }, [cellGap, cellSize, legendCategories, steps, widthOfSquares]);

  return (
    <C.Legend ref={legendRef}>
      <C.Text x={widthOfSquares - 50} y={3 + (cellSize / 2)}>{t('less', 'asurgentui')}</C.Text>
      <C.Text x={0} y={3 + (cellSize / 2)}>{t('more', 'asurgentui')}</C.Text>
    </C.Legend>
  );
};

Legend.propTypes = propTypes;
Legend.defaultProps = defaultProps;

export default Legend;
