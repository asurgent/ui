export const EXCLUDE = 'ne';
export const INCLUDE = 'nq';
export const REMOVE = 'state:remove';

const filterJoiner = (list, joinOpperator) => {
  if (list.length > 0) {
    const filters = list.join(`) ${joinOpperator} (`);
    return `(${filters})`;
  }

  return '';
};

export const buildFilterObjectFromStateString = (stateString) => {
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

  if (Object.keys(mini).length > 0) {
    const result = encodeURI(btoa(JSON.stringify(mini)));
    return result;
  }

  return '';
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
