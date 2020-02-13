
export const directionKeys = {
  asc: 'asc',
  desc: 'desc',
};

const sanitizeDirection = (direction) => {
  if (direction === directionKeys.desc || direction === directionKeys.asc) {
    return direction;
  }
  return directionKeys.desc;
};

export const getDefaultSortItem = (sortKeys) => {
  const hasDefaultSort = sortKeys.find((item) => item.default);

  if (hasDefaultSort) {
    const { value, direction } = hasDefaultSort;
    return { key: value, direction: sanitizeDirection(direction) };
  }

  const { value } = sortKeys[0];
  return { key: value, direction: directionKeys.desc };
};
