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
  const [filterCategoriesConfiguration] = useState(config);
  const [selectedItems, setSelectedItems] = useState({}); // dict of selected items. Set from URL-state
  const [initiated, setInitiated] = useState(false); // if we need to load facets

  // Set initail value from history-state
  useEffect(() => {
    const state = tableHook.getHistoryState();
    if (state && Object.keys(state).length) {
      const { filter } = state;
      const filterObject = buildFilterObjectFromStateString(filter);
      setSelectedItems(filterObject);
    }
  }, []);

  const triggerUpdate = (filterState) => {
    const filter = buildFilterQuery(filterState);
    const stateString = buildFilterStateString(filterState);
    tableHook.update({ filter }, { filter: stateString });
  };

  return {
    isInitated: () => initiated,
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
    fetchFilterListItems: () => {
      if (!initiated) {
        const keys = filterCategoriesConfiguration
          .reduce((acc, { facetKey }) => [...acc, facetKey], []);

        if (tableHook.updateTableItems && Object.keys(tableHook.updateTableItems).length > 0) {
          const { callback, onSuccess, onFail } = tableHook.updateFilterItems;
          callback(keys, onSuccess, onFail);
          setInitiated(true); // FIX
        }
      }
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
        triggerUpdate(update);
        return true;
      }

      const update = { ...selectedItems, [filterKey]: [{ key, state }] };
      setSelectedItems(update);
      triggerUpdate(update);
      return true;
    },
    clearFilter: () => {
      setSelectedItems({});
      triggerUpdate({});
    },
    getFilterItemsByKey: (key) => {
      if (Object.keys(tableHook.filterData).length
      && Object.prototype.hasOwnProperty.call(tableHook.filterData, key)) {
        const filterState = selectedItems[key];

        if (filterState) {
          return tableHook.filterData[key]
            .reduce((acc, item) => {
              const stateItem = { ...item };
              const hasState = filterState.find(({ filterKey }) => filterKey === item.value);

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
    getFilterCategories: () => filterCategoriesConfiguration,
  };
};

export default useFilterProvider;
