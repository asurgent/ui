import {
  useEffect, useState, useMemo, createRef,
} from 'react';

const getDetfaultValue = (values) => {
  if (!values) { return []; }
  if (Array.isArray(values)) { return values; }
  return [values];
};

const getDetfaultSingleValue = (values, options) => {
  const parseValue = getDetfaultValue(values);
  if (parseValue.length > 0) {
    return parseValue;
  }
  if ((!values || (Array.isArray(values) && values.length === 0)) && options.length > 0) {
    return [options[0]];
  }

  return [];
};

const useTableHook = (values, options, multiSelect, outputParser) => {
  const inputRef = createRef();
  const [isOpen, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedOptions, setSelected] = useState([]);
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    if (isReady === false && options && options.length > 0) {
      if (!multiSelect) {
        setSelected(getDetfaultSingleValue(values, options));
      } else {
        setSelected(getDetfaultValue(values));
      }
      setReady(true);
    }
  }, [values, options, multiSelect, selectedOptions, isReady]);

  const listOptions = useMemo(() => {
    if (options && Array.isArray(options)) {
      const selected = getDetfaultValue(values);
      const mergedOptions = Array.from(new Set([
        ...selected,
        ...options,
      ])).reduce((acc, item) => [{
        value: item,
        selected: selectedOptions.some((val) => val === item),
      }, ...acc], []);

      const filterd = mergedOptions
        .filter((item) => {
          if (item.static === true) {
            return true;
          }

          const label = item.label || item.value;

          if (label) {
            return label
              .toString()
              .toLowerCase()
              .match(search.toString().toLowerCase());
          }
          return false;
        })
        .sort((a, b) => {
          const textA = (a.value || '').toUpperCase();
          const textB = (b.value || '').toUpperCase();
          if (textA < textB) { return -1; }
          if (textA > textB) { return 1; }
          return 0;
        })
        .sort((a, b) => {
          if (a.selected && !b.selected) { return -1; }
          if (!a.selected && b.selected) { return 1; }
          return 0;
        });

      return filterd;
    }
    return [];
  }, [options, search, selectedOptions, values]);


  return {
    inputRef,
    isOpen,
    setOpen,
    search,
    setSearch,
    hasOptions: () => listOptions.length > 0,
    getOptions: () => listOptions,
    hasSelected: () => selectedOptions.length > 0,
    getSelected: () => outputParser,
    getInputValue: () => {
      if (!multiSelect) {
        return outputParser(selectedOptions[0]);
      }

      return outputParser(selectedOptions);
    },
    showPlaceHolder: () => selectedOptions.length === 0,
    showTags: () => Boolean(multiSelect) && selectedOptions.length > 0,
    getTags: () => selectedOptions.sort((a, b) => {
      const textA = (a || '').toUpperCase();
      const textB = (b || '').toUpperCase();
      if (textA < textB) { return -1; }
      if (textA > textB) { return 1; }
      return 0;
    }).map((val) => ({ value: val })),
    selectItem: (item) => {
      if (multiSelect) {
        if (item.selected) {
          const result = selectedOptions.filter((value) => value !== item.value);
          setSelected(result);

          return result;
        }

        const result = Array.from(new Set([item.value, ...selectedOptions]));
        setSelected(result);

        return result;
      }

      setSelected([item.value]);
      return item.value;
    },
  };
};

export default useTableHook;
