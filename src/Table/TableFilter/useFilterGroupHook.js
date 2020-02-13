import { useState, useEffect } from 'react';

const useFilterProvider = (tableHook, filterHook, filterGroupKey) => {
  const [isReady, setIsReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!isReady) {
      tableHook.loadFilterItems(filterHook.filterGroups);
      setIsReady(true);
    }
    if (!open) {
      const items = filterHook.getFilterItemsByGroup(filterGroupKey);
      setOptions(items);
    }
  }, [open]);

  useEffect(() => {
    const items = filterHook.getFilterItemsByGroup(filterGroupKey);
    setOptions(items);
  }, [tableHook.filterData, filterHook.selectedItems]);

  return {
    isReady,
    setOpen: (state) => setOpen(state),
    isOpen: () => open,
    onSearchOptions: ({ search }) => {
      const items = filterHook.getFilterItemsByGroup(filterGroupKey);

      if (search) {
        const filterd = items.filter(({ value }) => value.match(search));
        setOptions(filterd);
      } else {
        setOptions(items);
      }
    },
    hasOptions: () => options.length > 0,
    getOptions: () => options,
  };
};

export default useFilterProvider;
