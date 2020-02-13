import { useState, useEffect } from 'react';

const useSearchbarHook = (tableHook) => {
  const [isReady, setIsReady] = useState(false);
  const [query, setQuery] = useState('');

  // Set initail value from history-state
  useEffect(() => {
    const state = tableHook.getHistoryState();
    if (state && Object.keys(state).length) {
      const { text } = state;
      if (text !== undefined) {
        setQuery(text);
      }
    }

    setIsReady(true);
  }, []);

  // Perform an table update whenever user searches
  useEffect(() => {
    if (isReady) {
      const request = { search_string: `${query}` };
      const history = { search: `${query}` };

      tableHook.update(request, history);
    }
  }, [query]);


  return {
    isReady,
    getQuery: () => query,
    setQuery: (q) => setQuery(q),
  };
};

export default useSearchbarHook;
