export const getColor = (value, emptyColor, categories) => {
  if (value === null) {
    return emptyColor;
  }
  const categoryColor = categories.find(
    (c) => c.lowerBound <= value && c.upperBound >= value,
  )?.color || emptyColor;

  return categoryColor;
};
