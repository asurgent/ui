import { useState, useEffect } from 'react';
import { buildFilterQuery } from './helpers';

const useFilterProvider = (tableHook, filterHook, filterGroupKey) => {
  // Keeps track of when component has been mounted.
  // After its been mounted and set to true, the initail state is set
  const [isReady, setIsReady] = useState(false);

  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  const filterItemsBySearch = () => {
    const items = filterHook.getFilterItemsByGroup(filterGroupKey);

    if (search) {
      const filterd = items
        .filter((item) => {
          const label = filterHook.getLabel(item, filterGroupKey);

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
      const { [filterGroupKey]: current, ...rest } = filterHook.selectedItems;
      const requestString = buildFilterQuery(rest);

      tableHook.loadFilterForKey(filterGroupKey, requestString);
      setIsReady(true);
    } else {
      setSearch('');
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      filterItemsBySearch();
    }
  }, [search]);


  // @ToDo: This could possibly be refactored and the
  // state of a group could be completley owned by this hook
  // Update internal state whenever selectedItems are changes in order to
  // render the correct state in the UI.
  useEffect(() => {
    filterItemsBySearch();
  }, [tableHook.getAllFilters(), filterHook.selectedItems]);

  return {
    isReady,
    setOpen: (state) => setOpen(state),
    isOpen: () => open,
    hasOptions: () => filterHook.getFilterItemsByGroup(filterGroupKey).length > 0,
    getOptions: () => options,
    onSearchOptions: ({ search }) => {
      setSearch(search);
    },
  };
};

export default useFilterProvider;
