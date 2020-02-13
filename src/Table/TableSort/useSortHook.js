import { useState, useEffect } from 'react';
// import * as H from '../helpers';
import { getDefaultSortItem, directionKeys } from './helpers';

const useSearchbarHook = (sortKeyOptionsConfiguration, tableHook) => {
  const [isReady, setIsReady] = useState(false);
  const [options, setOptions] = useState(sortKeyOptionsConfiguration);
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  // Set initail value from history-state
  useEffect(() => {
    const state = tableHook.getHistoryState();
    if (state && Object.keys(state).length) {
      const { sort } = state;
      if (sort !== undefined) {
        const [key, direction] = sort.split('-');
        setSortKey(key);
        setSortDirection(direction);
      } else {
        const { key, direction } = getDefaultSortItem(options);
        setSortKey(key);
        setSortDirection(direction);
      }
    }

    setIsReady(true);
  }, []);

  // Perform an table update whenever user changes filter
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
