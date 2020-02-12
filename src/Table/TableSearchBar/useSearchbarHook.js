import { useState, useEffect } from 'react';

const useSearchbarHook = (tableHook) => {
  const [query, setQuery] = useState('');

  // Set initail value from history-state
  useEffect(() => {
    const state = tableHook.getHistoryState();
    if (state && Object.keys(state).length) {
      const { searchQuery } = state;
      setQuery(searchQuery);
    }
  }, [tableHook.isMounted]);

  // Perform an table update whenever user searches
  useEffect(() => {
    if (tableHook.isMounted) {
      tableHook.update({ searchQuery: query });
    }
  }, [query]);


  return {
    getQuery: () => query,
    setQuery: (q) => setQuery(q),
  };
};

export default useSearchbarHook;
