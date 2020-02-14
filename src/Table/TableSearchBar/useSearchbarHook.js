import { useState, useEffect } from 'react';

const useSearchbarHook = (tableHook) => {
  const [isReady, setIsReady] = useState(false);
  const [query, setQuery] = useState('');

  // Initial setter. This will trigger Poppulate effect as well.
  useEffect(() => {
    const state = tableHook.getHistoryState();
    // Set internal state from URL if found
    if (state && Object.keys(state).length) {
      const { text } = state;
      if (text !== undefined) {
        setQuery(text);
      }
    }


    setIsReady(true);
  }, []);

  // Poppulate tabelHook with state for requests and URL
  useEffect(() => {
    if (isReady) {
      const request = { search_string: `${query}` };
      const history = { search: `${query}` };

      tableHook.update(request, history);
    }
  }, [query, isReady]);


  return {
    isReady,
    getQuery: () => query,
    setQuery: (q) => setQuery(q),
  };
};

export default useSearchbarHook;
