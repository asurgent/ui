import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import * as C from './DayText.styled';
import translation from './DayText.translation';

const { t } = translation;

const propTypes = {
  cellSize: PropTypes.number,
};
const defaultProps = {
  cellSize: 18,
};

const DayText = ({ cellSize }) => {
  const gRef = useRef(null);

  useEffect(() => {
    if (gRef.current) {
      const dayText = d3.select(gRef.current);
      dayText
        .selectAll('text')
        .data(d3.range(7).map((i) => new Date(new Date().getFullYear(), 0, i)))
        .join('text')
        .attr('y', (d) => (d.getUTCDay() + 0.5) * cellSize)
        .attr('dy', '0.31em')
        .text((d) => t(`day${new Date(d).getUTCDay()}`, 'asurgentui'));
    }
  }, [cellSize]);

  return (
    <C.DayText id="dayText" ref={gRef} />
  );
};

DayText.propTypes = propTypes;
DayText.defaultProps = defaultProps;

export default DayText;
