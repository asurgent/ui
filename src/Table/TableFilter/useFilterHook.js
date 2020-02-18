import { useState, useEffect } from 'react';
import {
  INCLUDE,
  EXCLUDE,
  REMOVE,
  buildFilterQuery,
  buildFilterStateString,
  buildFilterObjectFromStateString,
} from './helpers';

const useFilterProvider = (filterKeys, tableHook, parseRequestOutput, parseDisplayLabel) => {
  // Keeps track of when component has been mounted.
  // After its been mounted and set to true, the initail state is set
  const [isReady, setIsReady] = useState(false);


  const [filterGroups] = useState(filterKeys);
  const [selectedItems, setSelectedItems] = useState({});


  // Initial setter. This will trigger Poppulate effect as well.
  useEffect(() => {
    if (tableHook.isReady) {
      const state = tableHook.getHistoryState();
      // Set internal state from URL if found
      if (state && Object.keys(state).length) {
        const { filter } = state;
        const filterObject = buildFilterObjectFromStateString(filter);

        setSelectedItems(filterObject);
      }
      setIsReady(true);
    }
  }, [tableHook.isReady]);


  // Poppulate tabelHook with state for requests and URL
  useEffect(() => {
    if (isReady) {
      const filter = buildFilterQuery(selectedItems, parseRequestOutput);
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
    hasActiveFilter: () => Object.values(selectedItems).some((list) => list.length > 0),
    getLabel: (item, groupKey) => {
      if (parseDisplayLabel && typeof parseDisplayLabel === 'function') {
        const parsedLabel = parseDisplayLabel(item.value, groupKey);

        if (typeof parsedLabel === 'string') {
          return parsedLabel;
        }
      }

      return item.value;
    },
    setSelectedItems: (state) => setSelectedItems(state),
    getFilterListItems: () => tableHook.filterData,
    updateFilterItemState: (filterKey, filterValueTarget, state) => {
      if (Object.prototype.hasOwnProperty.call(selectedItems, filterKey)) {
        const stateList = selectedItems[filterKey];
        const cleanUp = stateList.filter((item) => item.value !== filterValueTarget);

        if (state !== REMOVE) {
          cleanUp.push({ value: filterValueTarget, state });
        }

        const update = { ...selectedItems, [filterKey]: cleanUp };
        setSelectedItems(update);
      } else {
        const update = { ...selectedItems, [filterKey]: [{ value: filterValueTarget, state }] };
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
              const hasState = filterState.find((selected) => selected.value === item.value);

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
