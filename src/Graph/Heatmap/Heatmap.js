import React, { useEffect } from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import moment from 'moment';
import translation from './Heatmap.translation';

const { t } = translation;

const sampleSize = 350;
const sample = [...Array(sampleSize)].map((el, ind) => ({
  date: new Date(moment().subtract(sampleSize - ind, 'days')),
  day: Math.floor(Math.random() * 4),
  count: Math.floor(Math.random() * 2) === 0 ? null : Math.floor(Math.random() * 50),
}));

sample.sort((a, b) => new Date(a.Date) - new Date(b.Date));

const dateValues = sample.map((dv) => ({
  date: d3.timeDay(new Date(dv.date)),
  value: dv.count,
}));

const propTypes = {
  steps: PropTypes.number,
  legendWidth: PropTypes.number,
  color: PropTypes.string,
  emptyColor: PropTypes.string,
  theme: PropTypes.instanceOf(Object),
  cellSize: PropTypes.number,
  cellPadding: PropTypes.string,
};

const defaultProps = {
  steps: 6,
  legendWidth: 14,
  color: null,
  emptyColor: null,
  theme: {},
  cellSize: 17,
  cellPadding: '2px',
};

const getColor = (value, emptyColor, categories) => {
  if (value === null || value === 0) {
    return emptyColor;
  }
  const categoryColor = categories.find(
    (c) => c.lowerBound <= value && c.upperBound >= value,
  ).color;
  return categoryColor;
};

const convertData = (dateEntries) => {
  const splitOnYears = dateEntries.reduce((acc, k) => {
    const fullYear = new Date(k.date).getFullYear();

    acc[fullYear] = acc[fullYear] || [];
    acc[fullYear].push(k);
    return acc;
  }, []);

  return Object.keys(splitOnYears).map((key) => ({
    key,
    values: splitOnYears[key],
  }));
};

const Heatmap = ({
  steps, legendWidth, color, emptyColor, cellSize, cellPadding, theme,
}) => {
  useEffect(() => {
    const svg = d3.select('#svg');

    function draw() {
      const years = convertData(dateValues);
      const values = dateValues.map((c) => c.value);
      const maxValue = d3.max(values);
      const minValue = d3.min(values);
      const yearHeight = cellSize * 7;

      const group = svg.append('g');
      // g.selectAll(g) -> 20018,2019,2020 group
      const year = group
        .selectAll('g')
        .data(years)
        .join('g')
        .attr(
          'transform',
          (d, i) => `translate(50, ${yearHeight * i + cellSize * 1.5})`,
        );

      year
        .append('text')
        .attr('x', -5)
        .attr('y', -30)
        .attr('text-anchor', 'end')
        .attr('font-size', 16)
        .attr('font-weight', 550)
        .attr('transform', 'rotate(270)')
        .text((d) => d.key);

      const countDay = (d) => d.getUTCDay();
      const timeWeek = d3.utcSunday;
      const formatDate = d3.utcFormat('%x');

      const myColor = d3
        .scaleLinear()
        .domain([Math.floor(minValue), Math.ceil(maxValue)])
        .range(['white', color || theme.ruby800]);

      year
        .append('g')
        .attr('class', 'dayText')
        .attr('text-anchor', 'end')
        .selectAll('text')
        .data(d3.range(7).map((i) => new Date(1995, 0, i)))
        .join('text')
        .attr('x', -5)
        .attr('y', (d) => (countDay(d) + 0.5) * cellSize)
        .attr('dy', '0.31em')
        .attr('font-size', 12)
        .text((d) => t(`day${d.getUTCDay()}`));

      const categories = [...Array(steps)].map((_, i) => {
        const upperBound = (maxValue / steps) * (i + 1);
        const lowerBound = (maxValue / steps) * i;
        return {
          upperBound,
          lowerBound,
          color: myColor(lowerBound),
          selected: true,
        };
      });

      year
        .append('g')
        .attr('class', 'yearGroup')
        .selectAll('rect')
        .data((d) => d.values)
        .join('rect')
        .attr('width', cellSize - 3)
        .attr('height', cellSize - 3)
        .attr(
          'x',
          (d) => timeWeek.count(d3.utcYear(d.date), d.date) * cellSize + 10
          ,
        )
        .attr('y', (d) => countDay(d.date) * cellSize + 0.5)
        .attr('fill', (d) => getColor(d.value, emptyColor || theme.gray100, categories))
        .on('click', (d) => console.log('clicked', d))
        .attr('rx', cellPadding)
        .attr('ry', cellPadding)
        .append('title')
        .text((d) => `${formatDate(d.date)}: ${d.value?.toFixed(2) || 'null'}`);

      /* Legend */
      const legend = group
        .append('g')
        .attr('class', 'legend')
        .attr(
          'transform',
          `translate(600, ${years.length * yearHeight + cellSize * 2})`,
        );

      const toggle = (leg) => {
        const { lowerBound, upperBound, selected } = leg;
        leg.selected = !selected;
        const highlightedDates = years.map((y) => ({
          key: y.key,
          values: y.values.filter(
            (v) => v.value > lowerBound && v.value <= upperBound,
          ),
        }));

        year
          .data(highlightedDates)
          .selectAll('rect')
          .data(
            (d) => d.values,
            (d) => d.date,
          )
          .transition()
          .duration(500)
          .attr('fill', (d) => (!leg.selected ? emptyColor : getColor(d.value, emptyColor || theme.gray100, categories)));
      };

      legend
        .selectAll('rect')
        .data(categories)
        .enter()
        .append('rect')
        .attr('fill', (d) => d.color)
        .attr('x', (d, i) => (legendWidth + 4) * i)
        .attr('width', legendWidth)
        .attr('height', legendWidth)
        .attr('rx', cellPadding)
        .attr('ry', cellPadding)
        .on('click', toggle);

      legend
        .append('text')
        .text(t('less', 'asurgentui'))
        .attr('font-size', 12)
        .attr('x', -20)
        .attr('y', 11);

      legend
        .append('text')
        .text(t('more', 'asurgentui'))
        .attr('font-size', 12)
        .attr('x', 120)
        .attr('y', 11);

      /*    legend
        .selectAll('text')
        .data(categories)
        .join('text')
        // .attr('transform', 'rotate(90)')
        // .attr('y', (d, i) => -legendWidth * i)
        // .attr('dy', -30)
        .attr('x', 18)
        .attr('text-anchor', 'start')
        .attr('font-size', 11)
        .text(
          (d) => 'before', // `${Math.floor(d.lowerBound)} - ${Math.ceil(d.upperBound)}`,
        ); */
      const { width, height } = svg
        .select('g').node().getBoundingClientRect();
      svg.attr('width', width)
        .attr('height', height + 60);
    }

    draw();
  }, [cellPadding, cellSize, color, emptyColor, legendWidth, steps, theme.gray100, theme.ruby800]);

  return (<svg id="svg" />);
};

Heatmap.propTypes = propTypes;
Heatmap.defaultProps = defaultProps;

export default withTheme(Heatmap);

/* const Heatmap = () => {
  useEffect(() => {
    // set the dimensions and margins of the graph
    const margin = {
      top: 30, right: 30, bottom: 30, left: 30,
    };
    const width = 800 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select('#my_dataviz')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform',
        `translate(${margin.left},${margin.top})`);

    // Labels of row and columns
    const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const months = [];

    // Build X scales and axis:
    const x = d3.scaleBand()
      .range([0, width])
      .domain([new Date(moment().subtract(5, 'days')), new Date()]) // [...Array(10)].map((el, ind) => new Date(moment().subtract(10 - ind, 'days')))
      .padding(0.01);
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Build X scales and axis:
    const y = d3.scaleBand()
      .range([height, 0])
      .domain([0, 1, 2, 3, 4, 5, 6])
      .padding(0.01);
    svg.append('g')
      .call(d3.axisLeft(y));

    // Build color scale
    const myColor = d3.scaleLinear()
      .range(['white', '#69b3a2'])
      .domain([1, 100]);

    // Read the data
    const myData = [...Array(100)].map((el, ind) => ({
      day: moment().subtract(100 - ind, 'days').day(),
      date: new Date(moment().subtract(100 - ind, 'days')),
      value: Math.floor(Math.random() * 100),
    }));

    // create a tooltip
    const tooltip = d3.select('#my_dataviz')
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip')
      .style('background-color', 'white')
      .style('border', 'solid')
      .style('border-width', '2px')
      .style('border-radius', '5px')
      .style('padding', '5px');

    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = (d) => {
      tooltip.style('opacity', 1);
    };
    const mousemove = (d) => {
      tooltip
        .html(`The exact value of<br>this cell is: ${d.value}`)
        .style('left', `${d3.mouse(this)[0] + 70}px`)
        .style('top', `${d3.mouse(this)[1]}px`);
    };
    const mouseleave = (d) => {
      tooltip.style('opacity', 0);
    };

    // add the squares
    svg.selectAll()
      .data(myData, (d) => d)
      .enter()
      .append('rect')
      .attr('x', (d) => d.date)
      .attr('y', (d) => d.day)
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .style('fill', (d) => m)
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave);
  }, []);

  return (
    <div id="my_dataviz" />
  );
};

export default Heatmap;
 */
