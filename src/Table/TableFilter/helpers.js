export const EXCLUDE = 'ne';
export const INCLUDE = 'nq';
export const REMOVE = 'state:remove';

// A helper to join-s an array and returns every items with
// parenteses and an join parameters
// Eg. ['one', 'two', 'three'] with joinOpperator "and"
// > "(one) and (two) and (three)"
const filterJoiner = (list, joinOpperator) => {
  if (list.length > 0) {
    const filters = list.join(`) ${joinOpperator} (`);
    return `(${filters})`;
  }

  return '';
};

export const buildFilterObjectFromStateString = (stateString) => {
  // Reverse parse the stringified state by parsing the string in reversed order.
  // 1. URI-Decode, 2. Reverse base64. 3. Parse to JSON.
  // 4. Unminify From {g: [['key', 'state']]} to {g: [{key: 'key', state: 'state}]} objects
  try {
    const uri = decodeURI(stateString);
    const base64 = atob(uri);
    const json = JSON.parse(base64);

    const unminify = Object.keys(json)
      .reduce((groups, groupKey) => {
        const group = json[groupKey];
        if (group && group.length > 0) {
          return {
            ...groups,
            [groupKey]: group.map(([key, state]) => ({
              value: key,
              state,
            })),
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
  // Simplyfy the filter-state object in order to minimize the URL/Query-param length
  // example Output { customer_id: [['1122', 'eq']]}
  // This step is reverse-parsed in buildFilterObjectFromStateString()
  // into eg. { customer_id: [{key: '1122', state: 'eq'}]}
  const mini = Object.keys(selectedFilters)
    .reduce((groups, key) => {
      const group = selectedFilters[key];
      if (group && group.length > 0) {
        return {
          ...groups,
          [key]: group.map((filter) => ([filter.value, filter.state])),
        };
      }

      return groups;
    }, {});


  /*
    If we have any selected filters we will preform
    1. Stringify the minified object
    2. Base64 encode it string
    3. URI-encode the tring
    4. Set to SQP value under filter-property
  */
  if (Object.keys(mini).length > 0) {
    const result = encodeURI(btoa(JSON.stringify(mini)));
    return result;
  }

  return '';
};

export const buildFilterQuery = (selectedFilters, parseRequestOutput) => {
  // Helper to run parser-function (if declared). Otherwise use standard keys & values
  const runParser = (item, groupKey) => {
    if (parseRequestOutput && typeof parseRequestOutput === 'function') {
      const parsedLabel = parseRequestOutput(item.value, groupKey);

      if (typeof parsedLabel === 'string') {
        return parsedLabel;
      }
    }

    return item.value;
  };

  const filterArray = Object.keys(selectedFilters)
    .reduce((filters, groupKey) => {
      const filterGroup = selectedFilters[groupKey];

      const filterTypeList = (collection, type, condition, joinOpperator) => {
        // Find all selected filters that match a certain type, eg. EXCLUDE.
        const typeList = filterGroup.filter((s) => s.state === type);
        // Build filter string
        const filterString = (filterItem) => `${groupKey} ${condition} '${runParser(filterItem, groupKey)}'`;
        // Build a new list with filter fomrated filter items
        const filterList = typeList.reduce((incl, s) => [...incl, filterString(s)], []);


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
