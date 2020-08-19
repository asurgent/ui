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

const getValuesAndLabel = (list) => {
  const result = list.reduce((acc, item) => {
    const [labels, options] = acc;

    if (typeof item === 'object' && item?.value) {
      Object.assign(labels, {
        [item.value]: item.label || item.value,
      });
      options.push(item.value);
    } else {
      Object.assign(labels, {
        [item]: item,
      });
      options.push(item);
    }

    return [
      labels,
      options,
    ];
  }, [{}, []]);

  return result;
};

const useFilterSelectHook = (values, options, multiSelect, outputParser) => {
  const inputRef = createRef();
  const [isOpen, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedOptions, setSelected] = useState([]);
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Wait for slideuptransition to complete
      // before showing all options again
      setTimeout(() => setSearch(''), 250);
    }
  }, [isOpen]);

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

  const [labelsList, optionsList] = useMemo(() => getValuesAndLabel(options), [options]);
  const selectedOptionsOutputList = useMemo(() => selectedOptions
    .map((value) => labelsList[value]),
  [labelsList, selectedOptions]);

  const listOptions = useMemo(() => {
    if (options && Array.isArray(options)) {
      const selected = getDetfaultValue(values);
      const mergedOptions = Array.from(new Set([
        ...selected,
        ...optionsList,
      ]))
        .reduce((acc, item) => [{
          label: labelsList[item] || item,
          value: item,
          selected: selectedOptions.some((val) => val === item),
        }, ...acc], []);

      const filterd = mergedOptions
        .filter((item) => {
          if (item.static === true) {
            return true;
          }

          const label = `${item.label || item.value}`;

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
  }, [labelsList, options, optionsList, search, selectedOptions, values]);

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
    getOutput: () => {
      if (!multiSelect) {
        return outputParser(selectedOptionsOutputList[0]);
      }

      return outputParser(selectedOptionsOutputList);
    },
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
    reset: (resetValues) => {
      if (isReady === true) {
        if (!multiSelect) {
          setSelected(getDetfaultSingleValue(resetValues, options));
        } else {
          setSelected(getDetfaultValue(resetValues));
        }
        setReady(true);
      }
    },
  };
};

export default useFilterSelectHook;
