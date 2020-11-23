import * as d3 from 'd3';
import translation from './Heatmap.translation';
import { getColor } from './helpers';

const { t } = translation;

const toggleCategory = ({
  legend, dates, squares, emptyColor, theme, categories,
}) => {
  const { lowerBound, upperBound, selected } = legend;
  legend.selected = !selected;

  const highlightedDates = dates.map((y) => ({
    key: y.key,
    values: y.values.filter(
      (v) => v.value > lowerBound && v.value <= upperBound,
    ),
  }));

  squares
    .data(highlightedDates)
    .selectAll('rect')
    .data(
      (d) => d.values,
      (d) => d.date,
    )
    .transition()
    .duration(500)
    .attr('fill', (d) => (!selected ? emptyColor : getColor(d.value, emptyColor || theme.gray100, categories)));
};

const Legend = ({
  legendWidth = 14,
  group,
  dates,
  squares,
  yearHeight,
  cellSize,
  categories,
  cellPadding,
  emptyColor,
  theme,
}) => {
  /* Legend container */

  const legend = group
    .append('g')
    .attr('class', 'legend')
    .attr(
      'transform',
      `translate(680, ${(cellSize * 7) + 10})`,
    );

  /* legend squares */
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
    .on('click', (_, leg) => toggleCategory({
      legend: leg, dates, squares, emptyColor, theme, categories,
    }));

  /* legent less */
  legend
    .append('text')
    .text(t('less', 'asurgentui'))
    .attr('font-size', 12)
    .attr('x', -45)
    .attr('y', 11);

  /* legend more */
  legend
    .append('text')
    .text(t('more', 'asurgentui'))
    .attr('font-size', 12)
    .attr('x', 100)
    .attr('y', 11);
};

export default Legend;
