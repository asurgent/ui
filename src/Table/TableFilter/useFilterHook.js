import { useState, useEffect } from 'react';
import {
  buildFilterQuery,
  buildFilterStateString,
  buildFilterObjectFromStateString,
  INCLUDE,
} from './helpers';

const useFilterProvider = (filterKeys, tableHook, parser) => {
  // Keeps track of when component has been mounted.
  // After its been mounted and set to true, the initail state is set
  const [isReady, setIsReady] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const [filterGroups] = useState(filterKeys);
  const [selectedItems, setSelectedItems] = useState({});
  const [hasSelectedItems, setHasSelectedItems] = useState(false);


  // Initial setter. This will trigger Poppulate effect as well.
  useEffect(() => {
    if (tableHook.isReady) {
      const getHistoryState = () => {
        const state = tableHook.getHistoryState();
        // Set internal state from URL if found
        if (state && Object.keys(state).length) {
          const { filter } = state;
          const filterObject = buildFilterObjectFromStateString(filter);

          return filterObject;
        }

        return {};
      };

      const selectedItemsCache = { ...getHistoryState() };
      const categoryDefaultValues = filterKeys.filter(({ defaultSelect }) => defaultSelect);


      categoryDefaultValues.forEach(({ facetKey, defaultSelect, multiSelect = true }) => {
        const valueObject = {};

        // if default value is: { value: x, count: y }
        if (defaultSelect?.count) {
          Object.assign(valueObject, { value: defaultSelect.value, count: defaultSelect.count });
        } else {
          // default value is: 'x'
          Object.assign(valueObject, { value: defaultSelect });
        }

        if (!selectedItemsCache[facetKey] || (selectedItemsCache[facetKey].length === 0)) {
          Object.assign(selectedItemsCache, {
            [facetKey]: [{
              ...valueObject, state: INCLUDE, isMultiSelect: multiSelect,
            }],
          });
        }
      });

      setSelectedItems(selectedItemsCache);

      setIsReady(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const hasSelected = Object.keys(selectedItems).some((key) => {
      const list = selectedItems[key];
      const category = filterKeys.find(({ facetKey }) => facetKey === key);

      // Look if there is items in the selected group
      // But dont include if its not a multiselect (aka singleSelect) filter.
      // Since a singleSelect MUST have a value, it cant be cleared.
      return (list.length > 0) && category.multiSelect !== false;
    });

    setHasSelectedItems(hasSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, selectedItems]);


  return {
    isReady,
    getParser: () => parser,
    getSelectedItems: () => selectedItems,
    getSelectedItemsByKey: (groupKey) => selectedItems[groupKey],
    getFilterGroups: () => filterGroups,
    hasActiveFilter: () => hasSelectedItems,
    setSelectedItems: (state) => setSelectedItems(state),
    clearFilter: () => {
      const categoryDefaultValues = filterKeys.filter(({ defaultSelect }) => defaultSelect);
      const selected = Object.keys(selectedItems)
        .reduce((acc, groupKey) => {
          if (categoryDefaultValues.some(({ facetKey }) => facetKey === groupKey)) {
            const group = selectedItems[groupKey];

            return { ...group, [groupKey]: group };
          }

          return acc;
        }, {});

      setSelectedItems(selected);
    },
  };
};

export default useFilterProvider;
