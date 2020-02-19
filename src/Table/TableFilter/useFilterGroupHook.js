import { useState, useEffect } from 'react';

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
        .filter(({ value }) => value
          .toString()
          .toLowerCase()
          .match(search.toString().toLowerCase()));

      setOptions(filterd);
    } else {
      setOptions(items);
    }
  };

  // Initial setter. This will trigger a fetch if no filter-items have been loaded
  useEffect(() => {
    if (!isReady) {
      tableHook.loadFilterItems(filterHook.filterGroups);
      setIsReady(true);
    }
    if (open) {
      filterItemsBySearch();
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
