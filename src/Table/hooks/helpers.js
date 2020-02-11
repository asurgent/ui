import queryString from 'query-string';
import { sortDirection } from '../helpers';

export const EXCLUDE = 'ne';
export const INCLUDE = 'nq';
export const REMOVE = 'state:remove';

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
    filter: state.filterQuery,
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

export const parseQueryArrayToString = (queryList) => queryList
  .reduce((acc, item) => {
    const { valid, value } = item;
    if (valid) {
      return [value, ...acc];
    }

    return acc;
  }, []).join(' ').trim();


export const getDefaultSortItem = (sortKeys) => {
  const hasDefaultSort = sortKeys.find((item) => item.default);

  if (hasDefaultSort) {
    const { value, direction } = hasDefaultSort;
    return { value, direction: sanitizeDirection(direction) };
  }

  const { value } = sortKeys[0];
  return { value, direction: sortDirection.desc };
};

const filterJoiner = (list, joinOpperator) => {
  if (list.length > 0) {
    const filters = list.join(`) ${joinOpperator} (`);
    return `(${filters})`;
  }

  return '';
};

export const buildFilterObjectFromState = (stateString) => {
  const uri = decodeURI(stateString);
  try {
    const base64 = atob(uri);
    const json = JSON.parse(base64);

    const unminify = Object.keys(json)
      .reduce((groups, groupKey) => {
        const group = json[groupKey];
        if (group && group.length > 0) {
          return {
            ...groups,
            [groupKey]: group.map(([key, state]) => ({ key, state })),
          };
        }

        return groups;
      }, {});

    return unminify;
  } catch (e) {
    return {};
  }
};

export const buildFilterStateString = (selectedFilters) => {
  const mini = Object.keys(selectedFilters)
    .reduce((groups, key) => {
      const group = selectedFilters[key];
      if (group && group.length > 0) {
        return {
          ...groups,
          [key]: group.map((filter) => ([filter.key, filter.state])),
        };
      }

      return groups;
    }, {});

  const result = encodeURI(btoa(JSON.stringify(mini)));

  return result;
};

export const buildFilterQuery = (selectedFilters) => {
  const filterArray = Object.keys(selectedFilters)
    .reduce((filters, filterKey) => {
      const filterGroup = selectedFilters[filterKey];

      const filterTypeList = (collection, type, condition, joinOpperator) => {
        // Find all selected filters that match a certain type, eg. EXCLUDE.
        const typeList = filterGroup.filter((s) => s.state === type);
        // Build a new list with filter fomrated filter items
        const filterList = typeList.reduce((incl, s) => [...incl, `${filterKey} ${condition} '${s.key}'`], []);


        if (filterList.length > 0) {
          // Join all filter items with specifific operator
          collection.push(filterList.join(` ${joinOpperator} `));
        }
      };

      if (filterGroup && filterGroup.length > 0) {
        const filterTypes = []; // list that can contain two types of filters, equals or not-equals

        filterTypeList(filterTypes, INCLUDE, 'eq', 'or');
        filterTypeList(filterTypes, EXCLUDE, 'ne', 'and');
        const join = filterJoiner(filterTypes, 'and');

        filters.push(join);
      }

      return filters;
    }, []);

  return filterJoiner(filterArray, 'and');
};
