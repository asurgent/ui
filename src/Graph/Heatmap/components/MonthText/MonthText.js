import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import * as C from './MonthText.styled';
import translation from './MonthText.translation';

const { t } = translation;

const propTypes = {
  cellSize: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
};
const defaultProps = {
  cellSize: 18,
  data: [],
};

const MonthText = ({ data, cellSize }) => {
  const gRef = useRef(null);

  useEffect(() => {
    if (gRef.current) {
      const dayText = d3.select(gRef.current);
      dayText
        .selectAll('text')
        .data(data) // d3.range(12).map((i) => new Date(new Date().getFullYear(), i, 1))
        .join('text')
        .attr('x', (d) => (d.date.getMonth() + 0.5) * cellSize * 4)
        .attr('dx', '0.31em')
        .text((d) => t(`month${new Date(d.date).getMonth()}`, 'asurgentui'));
    }
  }, [cellSize, data]);

  return (
    <C.MonthText ref={gRef} />
  );
};

MonthText.propTypes = propTypes;
MonthText.defaultProps = defaultProps;

export default MonthText;

/* if (d.date.getDate() === 1) {

          } */
