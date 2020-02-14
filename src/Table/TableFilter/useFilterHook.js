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
  const [filterGroups] = useState(config);
  const [isReady, setIsReady] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});


  // Initial setter. This will trigger Poppulate effect as well.
  useEffect(() => {
    const state = tableHook.getHistoryState();
    // Set internal state from URL if found
    if (state && Object.keys(state).length) {
      const { filter } = state;
      const filterObject = buildFilterObjectFromStateString(filter);

      setSelectedItems(filterObject);
    }
    setIsReady(true);
  }, []);

  // Poppulate tabelHook with state for requests and URL
  useEffect(() => {
    if (isReady) {
      const filter = buildFilterQuery(selectedItems);
      const stateString = buildFilterStateString(selectedItems);

      const request = { filter };
      const history = { filter: stateString ? `filter:${stateString}` : '' };

      tableHook.update(request, history);
    }
  }, [isReady, selectedItems]);


  return {
    isReady,
    filterGroups,
    selectedItems,
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
    getFilterItemsByGroup: (groupKey) => {
      if (Object.keys(tableHook.filterData).length
      && Object.prototype.hasOwnProperty.call(tableHook.filterData, groupKey)) {
        const filterState = selectedItems[groupKey];

        if (filterState) {
          return tableHook.filterData[groupKey]
            .reduce((acc, item) => {
              const stateItem = { ...item };
              const hasState = filterState.find(({ key: filterKey }) => filterKey === item.value);

              if (hasState) {
                Object.assign(stateItem, {
                  included: hasState.state === INCLUDE,
                  excluded: hasState.state === EXCLUDE,
                });
              }

              return [...acc, stateItem];
            }, []);
        }
        return tableHook.filterData[groupKey];
      }

      return [];
    },

  };
};

export default useFilterProvider;
