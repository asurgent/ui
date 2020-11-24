import translation from './Heatmap.translation';

const { t } = translation;

const Legend = ({
  svgGroup,
  legendCategories,
  cellSize,
  cellPadding,
  cellRadius,
}) => {
  /* Legend container */
  const legend = svgGroup
    .append('g')
    .attr('class', 'legend')
    .attr(
      'transform',
      `translate(680, ${(cellSize * 7) + 10})`, // cellSize * vertical day-squares + top-margin
    );

  /* legend squares */
  legend
    .selectAll('rect')
    .data(legendCategories)
    .enter()
    .append('rect')
    .attr('fill', (d) => d.color)
    .attr('x', (_, i) => (cellSize + cellPadding) * i)
    .attr('width', cellSize)
    .attr('height', cellSize)
    .attr('rx', cellRadius)
    .attr('ry', cellRadius);

  /* legend less-text */
  legend
    .append('text')
    .text(t('less', 'asurgentui'))
    .attr('font-size', 12)
    .attr('x', -45)
    .attr('y', 13);

  /* legend more-text */
  legend
    .append('text')
    .text(t('more', 'asurgentui'))
    .attr('font-size', 12)
    .attr('x', 110)
    .attr('y', 13);
};

export default Legend;
