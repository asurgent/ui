import { useState } from 'react';
import {
  INCLUDE, EXCLUDE, REMOVE, buildFilterQuery, buildFilterStateString,
} from './helpers';

const useFilterProvider = (config, tableHook) => {
  const [filterCategoriesConfiguration] = useState(config);
  const [filterListItems, setFilterListItems] = useState({}); // filter items. normally set from XHR req facets
  const [selectedItems, setSelectedItems] = useState({}); // dict of selected items. Set from URL-state
  const [initiated, setInitiated] = useState(false); // if we need to load facets

  const triggerUpdate = (filterState) => {
    const filter = buildFilterQuery(filterState);
    const stateString = buildFilterStateString(filterState);
    tableHook.onFilter(filter, stateString);
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
        tableHook.fetchFilter(keys, (listItems) => {
          setFilterListItems(listItems);
          setInitiated(true);
        });
      }
    },
    setSelectedItems: (state) => setSelectedItems(state),
    getFilterListItems: () => filterListItems,
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
      if (Object.keys(filterListItems).length
      && Object.prototype.hasOwnProperty.call(filterListItems, key)) {
        const filterState = selectedItems[key];

        if (filterState) {
          return filterListItems[key]
            .reduce((acc, item) => {
              const stateItem = { ...item };
              const hasState = filterState.find(({ key }) => key === item.value);

              if (hasState) {
                Object.assign(stateItem, {
                  included: hasState.state === INCLUDE,
                  excluded: hasState.state === EXCLUDE,
                });
              }

              return [...acc, stateItem];
            }, []);
        }
        return filterListItems[key];
      }

      return [];
    },
    getFilterCategories: () => filterCategoriesConfiguration,
  };
};

export default useFilterProvider;
