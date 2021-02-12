import {
  useEffect, useState, useMemo, createRef,
} from 'react';

const getDetfaultValue = (values) => {
  if (!values) { return []; }
  if (Array.isArray(values)) { return values.map((item) => `${item}`); }
  return [`${values}`];
};

const getDetfaultSingleValue = (values, options, hasPlaceholder) => {
  const parseValue = getDetfaultValue(values);
  if (parseValue.length > 0) {
    return parseValue;
  }

  if (!hasPlaceholder) {
    if ((!values || (Array.isArray(values) && values.length === 0)) && options.length > 0) {
      const first = options[0];
      if (first?.value !== undefined) {
        return [`${first.value}`];
      }
    }
  }

  return [];
};

const getValuesAndLabel = (list) => {
  const result = list.reduce((acc, item) => {
    const [labels, options, disabled] = acc;

    if (typeof item === 'object' && item?.value) {
      Object.assign(labels, {
        [item.value]: item.label || item.value,
      });
      options.push(item.value);

      Object.assign(disabled, {
        [item.value]: Boolean(item.disabled),
      });
    } else {
      Object.assign(labels, {
        [item]: item,
      });
      Object.assign(disabled, {
        [item.value]: false,
      });

      options.push(item);
    }

    return [
      labels,
      options,
      disabled,
    ];
  }, [{}, [], {}]);
  return result;
};

const useFilterSelectHook = (values, options, multiSelect, outputParser, hasPlaceholder) => {
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
        setSelected(getDetfaultSingleValue(values, options, hasPlaceholder));
      } else {
        setSelected(getDetfaultValue(values));
      }
      setReady(true);
    }
  }, [values, options, multiSelect, selectedOptions, isReady, hasPlaceholder]);

  useEffect(() => {
    // close option window when selecting new option
    if (!multiSelect) {
      setOpen(false);
    }
  }, [multiSelect, selectedOptions]);

  const [
    labelsList,
    optionsList,
    disabledList,
  ] = useMemo(() => getValuesAndLabel(options), [options]);
  const selectedOptionsOutputList = useMemo(() => selectedOptions
    .map((value) => (labelsList[value] || value)),
  [labelsList, selectedOptions]);

  const listOptions = useMemo(() => {
    if (options && Array.isArray(options)) {
      const selected = getDetfaultValue(values);
      const mergedOptions = Array.from(new Set([
        ...selected,
        ...optionsList,
      ]))
        .reduce((acc, item) => [{
          label: `${labelsList[item] || item}`,
          value: item,
          disabled: disabledList[item],
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
          const textA = a.label.toUpperCase();
          const textB = b.label.toUpperCase();
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
  }, [disabledList, labelsList, options, optionsList, search, selectedOptions, values]);

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
    getTags: () => selectedOptions
      .sort((a, b) => {
        const textA = (a || '').toUpperCase();
        const textB = (b || '').toUpperCase();

        if (textA < textB) { return -1; }
        if (textA > textB) { return 1; }
        return 0;
      }).map((val) => ({ value: labelsList?.[val] || val })),
    selectItem: (item) => {
      if (multiSelect) {
        if (item.selected) {
          const result = selectedOptions.filter((value) => value !== item.value);
          setSelected(result);

          return result;
        }

        const result = Array.from(new Set([`${item.value}`, ...selectedOptions]));
        setSelected(result);

        return result;
      }

      setSelected([`${item.value}`]);
      return `${item.value}`;
    },
    reset: (resetValues) => {
      if (isReady === true) {
        if (!multiSelect) {
          setSelected(getDetfaultSingleValue(resetValues, options, hasPlaceholder));
        } else {
          setSelected(getDetfaultValue(resetValues));
        }
        setReady(true);
      }
    },
  };
};

export default useFilterSelectHook;
