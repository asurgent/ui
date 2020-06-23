import { useState, useEffect } from 'react';
import { buildFilterQuery } from './helpers';
import translation from './TableFilter.translation';

const useFilterProvider = (tableHook, filterHook, filterGroupKey) => {
  // Keeps track of when component has been mounted.
  // After its been mounted and set to true, the initail state is set
  const [isReady, setIsReady] = useState(false);

  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  const getGroupFilter = () => {
    // Keep track of all items we found in the retrived list.
    // In order to know wich ones were not returned by the selected ones
    const matchedKeyInFilterList = [];
    const allFilters = tableHook.getAllFilters();


    const compare = (a, b) => {
      // Use toUpperCase() to ignore character casing
      const bandA = a.value.toUpperCase();
      const bandB = b.value.toUpperCase();

      let comparison = 0;
      if (bandA > bandB) {
        comparison = 1;
      } else if (bandA < bandB) {
        comparison = -1;
      }
      return comparison;
    };

    const { t } = translation;
    if (Object.keys(allFilters).length
    && Object.prototype.hasOwnProperty.call(allFilters, filterGroupKey)) {
      const selectedInGroup = filterHook.getSelectedItemsByKey(filterGroupKey);
      const groupFilter = allFilters[filterGroupKey].map((item) => ({ ...item, matched: true }));
      // If there is no selected items there is no need in the following step
      if (selectedInGroup && selectedInGroup.length > 0) {
        // Remove the selected items from the retrived filter set.
        // We will add them in the beginning of the array at return instead
        // That way we will also be able to show items that have
        // been selected but not returned in the filter set
        const unselectedInGroup = groupFilter
          .reduce((acc, item) => {
            if (selectedInGroup.find((selected) => selected.value === item.value)) {
              matchedKeyInFilterList.push(item);
              return acc;
            }

            return [...acc, item];
          }, []);


        // Decorate the filter item with a 'matched' attribute.
        // That means, if this filter item is pressent in the
        // current filter-segmentation for this group
        const parsedSelectedInGroup = selectedInGroup.reduce((acc, item) => {
          const matched = matchedKeyInFilterList.find(({ value }) => value === item.value);
          if (matched) {
            acc.matched.push({ ...item, matched });
          } else {
            acc.unmatched.push({ ...item, matched });
          }
          return acc;
        }, { matched: [], unmatched: [] });

        const { matched, unmatched } = parsedSelectedInGroup;
        const returnList = [];

        if (matched.length > 0) {
          returnList.push({ value: t('selected', 'asurgentui'), label: true, static: true });
          returnList.push(matched.sort(compare));
        }

        if (unmatched.length > 0) {
          returnList.push({ value: t('unmatched', 'asurgentui'), label: true, static: true });
          returnList.push(unmatched.sort(compare));
        }

        if (unselectedInGroup.length > 0) {
          returnList.push({ value: t('unselected', 'asurgentui'), label: true, static: true });
          returnList.push(unselectedInGroup.sort(compare));
        }

        return returnList.flat();
      }

      return [{ value: t('unselected', 'asurgentui'), label: true }, ...groupFilter];
    }

    return [];
  };

  const getLabel = (filterItem) => {
    const parser = filterHook.getParser();
    if (parser && parser.label && typeof parser.label === 'function') {
      const parsedLabel = parser.label(filterItem.value, filterGroupKey);

      if (typeof parsedLabel === 'string') {
        return parsedLabel;
      }
    }

    return filterItem.value;
  };

  const filterItemsBySearch = () => {
    const items = getGroupFilter();

    if (search) {
      const filterd = items
        .filter((item) => {
          if (item.static === true) {
            return true;
          }

          const label = getLabel(item);

          if (label) {
            return label
              .toString()
              .toLowerCase()
              .match(search.toString().toLowerCase());
          }
          return false;
        });

      setOptions(filterd);
    } else {
      setOptions(items);
    }
  };

  // Initial setter. This will trigger a fetch if no filter-items have been loaded
  useEffect(() => {
    if (open) {
      filterItemsBySearch();
      // Ommit the targetd group from the selected-items object and generate
      // a request-string that excludes the targeted group
      const { [filterGroupKey]: current, ...rest } = filterHook.getSelectedItems();
      const requestString = buildFilterQuery(rest);

      tableHook.loadFilterForKey(filterGroupKey, requestString);
      setIsReady(true);
    } else {
      setSearch('');
      setIsReady(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (open) {
      filterItemsBySearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableHook.getAllFilters(), filterHook.getSelectedItems(), search]);

  return {
    isReady,
    setOpen: (state) => setOpen(state),
    isOpen: () => open,
    hasOptions: () => getGroupFilter().length > 0,
    getOptions: () => options,
    getGroupKey: () => filterGroupKey,
    onSearchOptions: ({ searchQuery }) => setSearch(searchQuery),
  };
};

export default useFilterProvider;
