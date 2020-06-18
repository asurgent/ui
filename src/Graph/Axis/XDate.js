import React, {
  useMemo, createRef,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import * as d3 from 'd3';

const AxisGroup = styled.g`
    transform: translate${({ dimensions }) => `(0, ${dimensions.boundedHeight}px)`};
`;

const propTypes = {
  dimensions: PropTypes.instanceOf(Object).isRequired,
  xScale: PropTypes.instanceOf(Object).isRequired,
};

const defaultProps = {};
const locale = d3.timeFormatLocale({
  dateTime: '%a %b %e %X %Y',
  date: '%d.%m.%Y',
  time: '%HH:%M:%S',
  periods: [],
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  shortDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  months: ['Januany', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
});

// const formatMillisecond = locale.format('.%L');
// const formatSecond = locale.format(':%S');
const formatMinute = locale.format('%I:%M');
const formatHour = locale.format('%I %p');
const formatDay = locale.format('%a %d');
const formatWeek = locale.format('%b %d');
const formatMonth = locale.format('%B');
const formatYear = locale.format('%Y');

const customTick = (date) => {
  // if (d3.timeSecond(date) < date) {
  //   return formatMillisecond(date);
  // } if (d3.timeMinute(date) < date) {
  //   return formatSecond(date);
  // }
  if (d3.timeHour(date) < date) {
    return formatMinute(date);
  } if (d3.timeDay(date) < date) {
    return formatHour(date);
  } if (d3.timeMonth(date) < date) {
    if (d3.timeWeek(date) < date) {
      return formatDay(date);
    }
    return formatWeek(date);
  } if (d3.timeYear(date) < date) {
    return formatMonth(date);
  }
  return formatYear(date);
};

const XDateAxis = ({ dimensions, xScale }) => {
  const ref = createRef();

  useEffect(() => {
    d3.select(ref.current)
      .call(d3.axisBottom(xScale)
        .tickFormat(customTick));
  }, [ref, xScale]);

  return (
    <AxisGroup ref={ref} dimensions={dimensions} />
  );
};

XDateAxis.propTypes = propTypes;
XDateAxis.defaultProps = defaultProps;

export default XDateAxis;
