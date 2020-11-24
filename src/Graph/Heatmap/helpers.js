export const getColor = (value, emptyColor, legendCategories) => {
  if (value === null || value === 0) {
    return emptyColor;
  }

  const categoryColor = legendCategories.find(
    (c) => c.lowerBound <= value && c.upperBound >= value,
  )?.color || emptyColor;

  return categoryColor;
};
