import queryString from 'query-string';
import { sortDirection } from '../helpers';

const payloadDefaults = {
  search_string: '',
  filter: '',
  facets: [],
  order_by: [],
  search_fields: [],
  page_size: 10,
  page: 1,
};

const sanitizeDirection = (direction) => {
  if (direction === sortDirection.desc || direction === sortDirection.asc) {
    return direction;
  }
  return sortDirection.desc;
};

export const changeDefaultSort = (key, direction, sortKeys) => sortKeys
  .reduce((acc, { direction: removeA, default: removeB, ...rest }) => {
    if (key === rest.value) {
      const newSort = { ...rest, default: true, direction: sanitizeDirection(direction) };
      return [...acc, newSort];
    }

    return [...acc, { ...rest }];
  }, []);

export const generatePayload = (state) => {
  const sort = state.currentSort;
  const payload = {
    ...payloadDefaults,
    page: state.page,
    search_string: state.searchQuery,
    filter: state.filter,
    facets: state.facets,
    order_by: [],
    search_fields: [],
    page_size: state.size,
  };
  if (sort.value && sort.direction) {
    Object.assign(payload, {
      order_by: [`${sort.value} ${sort.direction}`],
    });
  }

  return payload;
};

const parseQueryArrayToString = (queryList) => queryList
  .reduce((acc, item) => {
    const { valid, value } = item;
    if (valid) {
      return [value, ...acc];
    }

    return acc;
  }, []).join(' ').trim();

export const buildSearchQuery = (
  prefix,
  location,
  state,
) => {
  const { page, searchQuery, currentSort } = state;
  const search = queryString.parse(location.search);
  const q = `${prefix && `${prefix}_`}q`;
  const tableState = [
    { value: `page:${page}`, valid: true },
    { value: `${searchQuery}`, valid: !!searchQuery },
    {
      value: `sort:${currentSort.value}-${currentSort.direction}`,
      valid: currentSort.value && currentSort.direction,
    },
  ];

  Object.assign(search, {
    [q]: parseQueryArrayToString(tableState),
  });

  return `?${queryString.stringify(search)}`;
};

export const getDefaultSortItem = (sortKeys) => {
  const hasDefaultSort = sortKeys.find((item) => item.default);

  if (hasDefaultSort) {
    const { value, direction } = hasDefaultSort;
    return { value, direction: sanitizeDirection(direction) };
  }

  const { value } = sortKeys[0];
  return { value, direction: sortDirection.desc };
};
