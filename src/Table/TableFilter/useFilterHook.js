import { useState, useEffect } from 'react';
import {
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
    getParser: () => parser,
    getSelectedItems: () => selectedItems,
    getSelectedItemsByKey: (groupKey) => selectedItems[groupKey],
    getFilterGroups: () => filterGroups,
    hasActiveFilter: () => Object.values(selectedItems).some((list) => list.length > 0),
    setSelectedItems: (state) => setSelectedItems(state),
    clearFilter: () => {
      setSelectedItems({});
    },
  };
};

export default useFilterProvider;
