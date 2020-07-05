import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import * as Icons from '@material-ui/icons';
import * as Spinner from '../../../Spinner';
import * as VirtualRender from '../../../VirtualRender';
import * as Shield from '../../../Shield';
import * as Tag from '../../../Tag';
import * as Transition from '../../../Transition';
import translation from './FilterSelect.translation';
import * as C from './FilterSelect.styled';
import useTableHook from '../../../Table/useTableHook';
import FilterItem from '../../../Table/TableFilter/components/FilterItem';
import useFilterGroupHook from '../../../Table/TableFilter/useFilterGroupHook';
import useFilterHook from '../../../Table/TableFilter/useFilterHook';

const { t } = translation;

const propTyps = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  props: PropTypes.instanceOf(Object),
  theme: PropTypes.instanceOf(Object),
  placeholder: PropTypes.string,
};

const defaultProps = {
  value: '',
  props: { },
  theme: {},
  placeholder: t('selectPlaceholder', 'asurgentui'),
};

const dispatchEvent = (value, ref) => {
  // dispatch mock-event so that the form can pick up an onChange-event.
  // has to be a string, so split the value in onSubmit into an array
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype, 'value',
  ).set;
  nativeInputValueSetter.call(ref.current, value);
  const inputEvent = new Event('input', { bubbles: true });
  ref.current.dispatchEvent(inputEvent);
};

const FilterSelect = forwardRef((props, ref) => {
  const {
    name,
    options,
    theme,
    placeholder,
    props: inputProps,
    value: inputValue,
  } = props;

  const {
    multiSelect = false,
    maxTags = 3,
    searchPlaceholder = t('searchPlaceHolder', 'asurgentui'),
  } = inputProps;

  const tableHook = useTableHook();

  const [value, setValue] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  // find matching options from incoming value
  useEffect(() => {
    if (multiSelect) {
      const checkedOptions = options
        .filter((opt) => inputValue?.includes(opt.value))
        .map((opt) => ({ ...opt, selected: true, matched: true }));

      setValue(checkedOptions);
    } else {
      const checkedOption = options.find((opt) => opt.value === inputValue);
      setValue({ ...checkedOption, selected: true, matched: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const parsers = {
    label: (filters) => {
      const matchedOpt = options.find((opt) => opt.value === filters);
      return matchedOpt?.label || '';
    },
  };

  const filterHook = useFilterHook([{ facetKey: name }], tableHook, parsers);
  const groupHook = useFilterGroupHook(tableHook, filterHook, name, () => {});

  // filter setup
  useEffect(() => {
    tableHook.registerFilterFetchCallback((payload, onSuccess) => {
      onSuccess({ [name]: options.map((opt) => ({ value: opt.value })) });
    });

    if (multiSelect) {
      const selectedOptions = options
        .filter((opt) => inputValue?.includes(opt.value));
      const filterOptions = selectedOptions
        .map((opt) => ({ ...opt, selected: true, label: false }));
      filterHook.setSelectedItems({ [name]: filterOptions });
    } else {
      const selectedOptions = options
        .find((opt) => opt.value === inputValue);
      filterHook.setSelectedItems(
        { [name]: [{ ...selectedOptions, selected: true }] },
      );
    }

    tableHook.parentReady();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const handleChangeMulti = (filterValue) => {
    let newSelectedOption;
    const alreadySelected = value.some((opt) => opt.value === filterValue);

    if (alreadySelected) {
      newSelectedOption = value.filter((opt) => opt.value !== filterValue);
    } else {
      newSelectedOption = [...value, options.find((opt) => opt.value === filterValue)];
    }
    setValue(newSelectedOption);

    const dispatchValues = newSelectedOption.map((opt) => opt.value);
    dispatchEvent(dispatchValues, ref);
  };

  const handleChangeSingle = (filterValue) => {
    let newOption;
    const alreadySelected = value?.value === filterValue;
    if (alreadySelected) {
      newOption = {};
      dispatchEvent('', ref);
    } else {
      newOption = options.find((opt) => opt.value === filterValue);
      dispatchEvent(filterValue, ref);
    }
    filterHook.setSelectedItems({ [name]: newOption });
    setValue(newOption);
    groupHook.setOpen(false);
  };

  const handleChange = ({ value: filterValue }) => {
    if (multiSelect) {
      handleChangeMulti(filterValue);
    } else {
      handleChangeSingle(filterValue);
    }
    groupHook.onSearchOptions({ searchQuery: '' });
    setSearchValue('');
  };

  const showTags = multiSelect && value.length > 0;
  return (
    <C.SelectFilter>
      <C.InputWrapper
        singleValue={!multiSelect && value?.label}
        onClick={() => groupHook.setOpen(true)}
      >
        <C.Input
          type="text"
          hideText={showTags}
          placeholder={placeholder}
          name={name}
          ref={ref}
          disabled
          value={multiSelect ? value.map((val) => val.value) : (value.value || '')}
          {...props.props}
        />
        {showTags && (
          <Tag.Collection
            tags={value.map((opt) => ({ value: opt.label }))}
            max={maxTags}
          />
        )}
      </C.InputWrapper>

      <C.FilterWrapper>
        <Shield.Transparent
          onClick={() => groupHook.setOpen(false)}
          shieldIsUp={groupHook.isOpen()}
        >
          <Transition.FadeInFitted isVisible={groupHook.isOpen()} timeout={80}>
            <C.Dropdown fitted>
              {tableHook.isFilterLoading && (
              <C.Center>
                <Spinner.Ring size={24} color={theme.blue400} />
              </C.Center>
              )}
              <C.Search>
                <C.FilterInput
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={({ target }) => {
                    setSearchValue(target.value);
                    groupHook.onSearchOptions({ searchQuery: target.value });
                  }}
                />
              </C.Search>

              <C.ListWrapper>
                {groupHook.getOptions().length > 0 && (
                <VirtualRender.List
                  rowHeight={48}
                  items={groupHook.getOptions().filter((opt) => opt.matched)}
                  style={{ flex: 1 }}
                >
                  {(filter, key) => (
                    <FilterItem
                      key={key}
                      multiSelect={multiSelect}
                      onChange={handleChange}
                      onAdd={() => null}
                      filterItem={filter}
                      groupHook={groupHook}
                      filterHook={filterHook}
                    />
                  )}
                </VirtualRender.List>
                )}
              </C.ListWrapper>
            </C.Dropdown>
          </Transition.FadeInFitted>
        </Shield.Transparent>
      </C.FilterWrapper>

      <Icons.ArrowDropDown className="down-arrow" fontSize="large" />
    </C.SelectFilter>
  );
});

FilterSelect.defaultProps = defaultProps;
FilterSelect.propTypes = propTyps;
FilterSelect.displayName = '@asurgent.ui.Form.Input.FilterInput';

export default withTheme(FilterSelect);
