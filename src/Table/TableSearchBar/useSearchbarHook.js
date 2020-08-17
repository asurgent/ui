import { useState, useEffect } from 'react';

const searchEngineParser = (query) => {
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

const parseRequestQuery = (query, parseSearchStringOutput) => {
  if (parseSearchStringOutput && typeof parseSearchStringOutput === 'function') {
    const searchFormat = `${searchEngineParser(query)}`;
    const result = parseSearchStringOutput(searchFormat);

    if (typeof result === 'string') {
      return result;
    }
  }

  return `${searchEngineParser(query)}`;
};

const useSearchbarHook = (tableHook, parsers) => {
  // Keeps track of when component has been mounted.
  // After its been mounted and set to true, the initail state is set
  const [isReady, setIsReady] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [query, setQuery] = useState('');

  // Initial setter. This will trigger Poppulate effect as well.
  useEffect(() => {
    if (tableHook.isReady) {
      const state = tableHook.getHistoryState();
      // Set internal state from URL if found
      if (state && Object.keys(state).length) {
        const { text } = state;
        if (text !== undefined) {
          setQuery(decodeURIComponent(text));
        }
      }

      setIsReady(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableHook.isReady]);

  useEffect(() => {
    if (tableHook.isReady && tableHook.hasTriggers()) {
      // Execute change component has been target from another hook
      const { search } = tableHook.thirdPartyTrigger;
      if (search !== undefined) {
        setQuery(decodeURIComponent(search));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableHook.hasTriggers()]);

  // Poppulate tabelHook with state for requests and URL
  useEffect(() => {
    if (isReady) {
      const request = { search_string: parseRequestQuery(query, parsers.parseSearchStringOutput) };
      const history = { search: `${encodeURIComponent(query)}` };
      const trigger = { page: 1 };

      // Check if this is the first render-cycle
      // Then we want to set page to 1.
      if (isDirty) {
        tableHook.update(request, history, trigger);
      } else {
        // Otherwise it's controlled by the URL or component
        tableHook.update(request, history);
        setIsDirty(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, isReady]);

  return {
    isReady,
    getQuery: () => query,
    setQuery: (q) => setQuery(q),
  };
};

export default useSearchbarHook;
