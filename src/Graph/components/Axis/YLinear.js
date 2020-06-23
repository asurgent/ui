import React, { useMemo, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const propTypes = {
  yScale: PropTypes.instanceOf(Object).isRequired,
};

const defaultPtops = {};

const YLinearAxis = ({ yScale }) => {
  const ref = createRef();

  useEffect(() => {
    d3.select(ref.current)
      .call(d3.axisLeft(yScale));
  }, [ref, yScale]);
  return (
    <g ref={ref} />
  );
};


YLinearAxis.propTypes = propTypes;
YLinearAxis.defaultPtops = defaultPtops;

export default YLinearAxis;
