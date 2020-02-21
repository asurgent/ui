import { useState, useEffect } from 'react';
import {
  INCLUDE,
  EXCLUDE,
  REMOVE,
  buildFilterQuery,
  buildFilterStateString,
  buildFilterObjectFromStateString,
} from './helpers';

const useFilterProvider = (filterKeys, tableHook, parser) => {
  // Keeps track of when component has been mounted.
  // After its been mounted and set to true, the initail state is set
  const [isReady, setIsReady] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

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
      const filter = buildFilterQuery(selectedItems, parser.filterItem, parser.filterKey);
      const stateString = buildFilterStateString(selectedItems);

      const request = { filter };
      const history = { filter: stateString ? `filter:${stateString}` : '' };
      const trigger = { page: 1 };

      if (parser.requestString && typeof parser.requestString === 'function') {
        const requestString = parser.requestString(filter);

        if (typeof requestString === 'string') {
          Object.assign(request, { filter: requestString });
        }
      }

      // Check if this is the first render-cycle
      // Then we want to set page to 1.
      if (isDirty) {
        tableHook.update(request, history, trigger);
      } else {
        // Otherwise it's controlled by the URL or component
        tableHook.update(request, history);
        setIsDirty(true);
      }
    }
  }, [isReady, selectedItems]);


  return {
    isReady,
    filterGroups,
    selectedItems,
    hasActiveFilter: () => Object.values(selectedItems).some((list) => list.length > 0),
    getLabel: (item, groupKey) => {
      if (parser.label && typeof parser.label === 'function') {
        const parsedLabel = parser.label(item.value, groupKey);

        if (typeof parsedLabel === 'string') {
          return parsedLabel;
        }
      }

      return item.value;
    },
    setSelectedItems: (state) => setSelectedItems(state),
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
      // Keep track of all items we found in the retrived list.
      // In order to know wich ones were not returned by the selected ones
      const matchedKeyInFilterList = [];

      const allFilters = tableHook.getAllFilters();

      if (Object.keys(allFilters).length
      && Object.prototype.hasOwnProperty.call(allFilters, groupKey)) {
        const selectedInGroup = selectedItems[groupKey];

        // If there is no selected items there is no need in the following step
        if (selectedInGroup && selectedInGroup.length > 0) {
          // Remove the selected items from the retrived filter set.
          // We will add them in the beginning of the array at return instead
          // That way we will also be able to show items that have
          // been selected but not returned in the filter set
          const unselectedInGroup = allFilters[groupKey]
            .reduce((acc, item) => {
              if (selectedInGroup.find((selected) => selected.value === item.value)) {
                matchedKeyInFilterList.push(item);
                return acc;
              }

              return [...acc, item];
            }, []);

          // Decorate the filter item with a 'matched' attribute.
          // That means, if this filter item is pressent in the current filter-segmentation for this group
          const parsedSelectedInGroup = selectedInGroup.reduce((acc, item) => {
            if (matchedKeyInFilterList.find(({ value }) => value === item.value)) {
              Object.assign(item, { matched: true });
            } else {
              Object.assign(item, { matched: false });
            }
            return [...acc, item];
          }, []);

          return [...parsedSelectedInGroup, ...unselectedInGroup];
        }

        return allFilters[groupKey];
      }

      return [];
    },

  };
};

export default useFilterProvider;
