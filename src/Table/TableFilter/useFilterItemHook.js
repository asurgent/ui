import { useState, useEffect } from 'react';
import {
  REMOVE,
  EXCLUDE,
  INCLUDE,
} from './helpers';

const useFilterProvider = (filterItem, groupHook, filterHook) => {
  const [state, setState] = useState(filterItem);
  const [matched, setMatched] = useState(filterItem);

  useEffect(() => {
    setState(filterItem.state);
    setMatched(filterItem.matched);
  }, [filterItem]);

  const setFilterItemState = (newState) => {
    const filterValueTarget = filterItem.value;
    const filterGroupKey = groupHook.getGroupKey();
    const selectedItems = filterHook.getSelectedItems();

    if (Object.prototype.hasOwnProperty.call(selectedItems, filterGroupKey)) {
      const stateList = selectedItems[filterGroupKey];
      const cleanUp = stateList.filter((item) => item.value !== filterValueTarget);

      if (newState !== REMOVE) {
        cleanUp.push({ value: filterValueTarget, state: newState });
      }

      const update = { ...selectedItems, [filterGroupKey]: cleanUp };
      filterHook.setSelectedItems(update);
    } else {
      const update = {
        ...selectedItems,
        [filterGroupKey]: [{
          value: filterValueTarget,
          state: newState,
        }],
      };
      filterHook.setSelectedItems(update);
    }
  };


  return {
    isExcluded: () => state === EXCLUDE,
    isIncluded: () => state === INCLUDE,
    isMatched: () => matched,
    setStateExclude: () => {
      if (filterItem.state === EXCLUDE) {
        setFilterItemState(REMOVE);
      } else {
        setFilterItemState(EXCLUDE);
      }
    },
    setStateInclude: () => {
      if (filterItem.state === INCLUDE) {
        setFilterItemState(REMOVE);
      } else {
        setFilterItemState(INCLUDE);
      }
    },
    getLabel: () => {
      const parser = filterHook.getParser();
      if (parser && parser.label && typeof parser.label === 'function') {
        const filterGroupKey = groupHook.getGroupKey();
        const parsedLabel = parser.label(filterItem.value, filterGroupKey);

        if (typeof parsedLabel === 'string') {
          return parsedLabel;
        }
      }

      return filterItem.value;
    },
  };
};

export default useFilterProvider;
