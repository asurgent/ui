import { useState, useEffect } from 'react';
import * as H from '../helpers';

const useSearchbarHook = (sortKeyOptionsConfiguration, tableHook) => {
  const [sortKeyOptions, setSortKeyOptions] = useState(sortKeyOptionsConfiguration);
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  // Set initail value from history-state
  useEffect(() => {
    const state = tableHook.getHistoryState();
    if (state && Object.keys(state).length) {
      sortDirection(state.sortDirection);
      setSortKey(state.sortKey);
    }
  }, [tableHook.isMounted]);

  // Perform an table update whenever user searches
  useEffect(() => {
    if (tableHook.isMounted) {
      tableHook.update({ sortKey, sortDirection });
    }
  }, [sortKey, sortDirection]);


  return {
    hasSortKeyOptions: () => sortKeyOptions.length > 0,
    getSortKeyOptions: () => sortKeyOptions,
    setSortKeyOptions: (key) => setSortKeyOptions(key),
    getCurrentSortDirection: () => sortDirection,
    currentSortDirectionIsAscending: () => {
      const { asc } = H.sortDirection;
      return sortDirection === asc;
    },
    toggleCurrentSortDirection: (newDirection) => {
      const { asc, desc } = H.sortDirection;

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
