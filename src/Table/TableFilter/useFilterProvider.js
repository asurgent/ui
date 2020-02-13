import { useState, useEffect } from 'react';
import {
  INCLUDE,
  EXCLUDE,
  REMOVE,
  buildFilterQuery,
  buildFilterStateString,
  buildFilterObjectFromStateString,
} from './helpers';

const useFilterProvider = (config, tableHook) => {
  const [isReady, setIsReady] = useState(false); // if we need to load facets
  const [filterGroups] = useState(config);
  const [selectedItems, setSelectedItems] = useState({}); // dict of selected items. Set from URL-state

  // Set initail value from history-state
  useEffect(() => {
    const state = tableHook.getHistoryState();
    if (state && Object.keys(state).length) {
      const { filter } = state;
      // console.log('state', state);

      const filterObject = buildFilterObjectFromStateString(filter);
      console.log(filterObject);

      setSelectedItems(filterObject);
      setIsReady(true);
    }
  }, []);

  // Perform an table update whenever user searches
  useEffect(() => {
    if (isReady) {
      const filter = buildFilterQuery(selectedItems);
      const stateString = buildFilterStateString(selectedItems);

      const request = { filter };
      const history = { filter: `filter:"${stateString}"` };

      tableHook.update(request, history);
    }
  }, [isReady, selectedItems]);


  return {
    isReady,
    filterGroups,
    hasActiveFilter: () => {
      const items = Object.keys(selectedItems);
      for (let i = 0; i < items.length; i++) {
        const key = items[i];
        const filterItems = selectedItems[key];

        if (filterItems.length > 0) {
          return true;
        }
      }

      return false;
    },
    setSelectedItems: (state) => setSelectedItems(state),
    getFilterListItems: () => tableHook.filterData,
    updateFilterItemState: (filterKey, key, state) => {
      if (Object.prototype.hasOwnProperty.call(selectedItems, filterKey)) {
        const stateList = selectedItems[filterKey];
        const cleanUp = stateList.filter((item) => item.key !== key);

        if (state !== REMOVE) {
          cleanUp.push({ key, state });
        }

        const update = { ...selectedItems, [filterKey]: cleanUp };
        setSelectedItems(update);
      } else {
        const update = { ...selectedItems, [filterKey]: [{ key, state }] };
        setSelectedItems(update);
      }
    },
    clearFilter: () => {
      setSelectedItems({});
    },
    getFilterItemsByKey: (key) => {
      if (Object.keys(tableHook.filterData).length
      && Object.prototype.hasOwnProperty.call(tableHook.filterData, key)) {
        const filterState = selectedItems[key];

        if (filterState) {
          return tableHook.filterData[key]
            .reduce((acc, item) => {
              const stateItem = { ...item };
              const hasState = filterState.find(({ key: filterKey }) => filterKey === item.value);
              console.log(filterState, stateItem);

              if (hasState) {
                Object.assign(stateItem, {
                  included: hasState.state === INCLUDE,
                  excluded: hasState.state === EXCLUDE,
                });
              }

              return [...acc, stateItem];
            }, []);
        }
        return tableHook.filterData[key];
      }

      return [];
    },

  };
};

export default useFilterProvider;
