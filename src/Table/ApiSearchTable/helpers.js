import { sortDirection as direction } from '../helpers';

export const getDefaultSort = (sortKeys) => {
  const sort = sortKeys.find(({ default: sortByDefault }) => sortByDefault);

  if (sort) {
    return sort;
  }

  const first = sortKeys[0];
  return first;
};

export const sortDirectionToString = (direction) => (direction ? 'desc' : 'asc');

export const generatePayloadSortString = (sorter) => {
  if (sorter.direction === undefined) {
    return `${sorter.value} desc`;
  }

  return `${sorter.value} ${sortDirectionToString(sorter.direction)}`;
};


// make sure our format is passed around in the app
export const parseInitialSort = (initialSort) => {
  if (initialSort) {
    if (initialSort.direction === direction.asc) {
      return direction.asc;
    }

    return direction.desc;
  }

  return null;
};
