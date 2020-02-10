import { useState } from 'react';

export const EXCLUDE = 'state:exclude';
export const INCLUDE = 'state:include';
export const REMOVE = 'state:remove';

const useFilterProvider = (config, tableHook) => {
  const [filterCategoriesConfiguration] = useState(config);
  const [filterListItems, setFilterListItems] = useState({}); // dict of selected items. Set from URL-state
  const [selectedItems, setSelectedItems] = useState({}); // dict of selected items. Set from URL-state
  const [initiated, setInitiated] = useState(false); // if we need to load facets

  const triggerUpdate = (filterState) => {
    const str = Object.keys(filterState)
      .reduce((acc, filterKey) => {
        if (filterState[filterKey] && filterState[filterKey].length > 0) {
          const includes = filterState[filterKey].filter((s) => s.state === INCLUDE);
          const excludes = filterState[filterKey].filter((s) => s.state === EXCLUDE);

          const categoryFilter = [];

          if (includes.length > 0) {
            const category = includes
              .reduce((keyState, s) => [...keyState, `${filterKey} eq '${s.key}'`], []).join(' or ');
            categoryFilter.push(category);
          }

          if (excludes.length > 0) {
            const category = excludes
              .reduce((keyState, s) => [...keyState, `${filterKey} ne '${s.key}'`], []).join(' and ');
            categoryFilter.push(category);
          }

          acc.push(`(${categoryFilter.join(') and (')})`);
        }
        return acc;
      }, []);

    if (str.length > 0) {
      tableHook.onFilter(`(${str.join(') and (')})`);
    } else {
      tableHook.onFilter('');
    }
  };

  return {
    isInitated: () => initiated,
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
