import { useState, useEffect } from 'react';
import { getDefaultSortItem, directionKeys } from './helpers';

const useSearchbarHook = (sortKeyOptionsConfiguration, tableHook) => {
  // Keeps track of when component has been mounted. 
  // After its been mounted and set to true, the initail state is set
  const [isReady, setIsReady] = useState(false);

  const [options, setOptions] = useState(sortKeyOptionsConfiguration);
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  // Initial setter. This will trigger Poppulate effect as well.
  useEffect(() => {
    const state = tableHook.getHistoryState();
    if (state && Object.keys(state).length) {
      const { sort } = state;
      // Set internal state from URL if found
      if (sort !== undefined) {
        const [key, direction] = sort.split('-');
        setSortKey(key);
        setSortDirection(direction);
        setIsReady(true);
        return;
      }
    }

    // If we dont find a state in the url, then set defaults
    const { key, direction } = getDefaultSortItem(options);
    setSortKey(key);
    setSortDirection(direction);
    setIsReady(true);
  }, []);

  // Poppulate tabelHook with state for requests and URL
  useEffect(() => {
    if (isReady && sortKey && sortDirection) {
      const request = { order_by: [`${sortKey} ${sortDirection}`] };
      const history = { sort: `sort:${sortKey}-${sortDirection}` };

      tableHook.update(request, history);
    }
  }, [sortKey, sortDirection]);

  return {
    isReady,
    hasOptions: () => options.length > 0,
    getOptions: () => options,
    setOptions: (optionsList) => setOptions(optionsList),
    getCurrentSortKey: () => sortKey,
    setCurrentSortKey: (key) => setSortKey(key),
    getCurrentSortDirection: () => sortDirection,
    currentSortDirectionIsAscending: () => {
      const { asc } = directionKeys;
      return sortDirection === asc;
    },
    toggleCurrentSortDirection: (newDirection) => {
      const { asc, desc } = directionKeys;

      if (newDirection) {
        setSortDirection(newDirection);
      } else if (sortDirection === asc) {
        setSortDirection(desc);
      } else {
        setSortDirection(asc);
      }
    },
  };
};

export default useSearchbarHook;
