import { useState, useEffect } from 'react';

const parseQuery = (query) => {
  if (!query) {
    return '';
  }
  const sanatize = query
    .replace(/\*/g, '') // Remove all *
    .replace(/\+/g, '') // Remove all +
    .replace(/-/g, '+'); // Replace all - with +


  const joined = (sanatize).split(' ').join('*+');

  return `${joined}*`;
};

const useSearchbarHook = (tableHook) => {
  // Keeps track of when component has been mounted.
  // After its been mounted and set to true, the initail state is set
  const [isReady, setIsReady] = useState(false);
  const [query, setQuery] = useState('');

  // Initial setter. This will trigger Poppulate effect as well.
  useEffect(() => {
    if (tableHook.isReady) {
      const state = tableHook.getHistoryState();
      // Set internal state from URL if found
      if (state && Object.keys(state).length) {
        const { text } = state;
        if (text !== undefined) {
          setQuery(text);
        }
      }


      setIsReady(true);
    }
  }, [tableHook.isReady]);

  // Poppulate tabelHook with state for requests and URL
  useEffect(() => {
    if (isReady) {
      const request = { search_string: `${parseQuery(query)}` };
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
