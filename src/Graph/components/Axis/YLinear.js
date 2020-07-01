import React, { useMemo, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const propTypes = {
  yScale: PropTypes.instanceOf(Object).isRequired,
};

const defaultProps = {};

const YLinearAxis = ({ yScale }) => {
  const ref = createRef();

  const ticks = useMemo(() => d3.axisLeft(yScale)
    .tickFormat((tickVal) => (
      tickVal >= 1000 ? `${tickVal / 1000}K` : tickVal
    )),
  [yScale]);

  useEffect(() => {
    d3.select(ref.current)
      .call(ticks);
  }, [ref, ticks, yScale]);

  return (<g ref={ref} />);
};

YLinearAxis.propTypes = propTypes;
YLinearAxis.defaultProps = defaultProps;

export default YLinearAxis;
