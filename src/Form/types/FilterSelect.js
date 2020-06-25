import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import * as Icons from '@material-ui/icons';
import * as Spinner from '../../Spinner';
import * as VirtualRender from '../../VirtualRender';
import * as Shield from '../../Shield';
import * as Tag from '../../Tag';
import * as Transition from '../../Transition';
import translation from './FilterSelect.translation';
import * as C from './FilterSelect.styled';
import useTableHook from '../../Table/useTableHook';
import FilterItem from '../../Table/TableFilter/components/FilterItem';
import useFilterGroupHook from '../../Table/TableFilter/useFilterGroupHook';
import useFilterHook from '../../Table/TableFilter/useFilterHook';

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
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype, 'value',
  ).set;
  nativeInputValueSetter.call(ref.current, value);
  const inputEvent = new Event('input', { bubbles: true });
  ref.current.dispatchEvent(inputEvent);
};

const FilterInput = forwardRef((props, ref) => {
  const {
    name,
    options,
    theme,
    placeholder,
    props: inputProps,
  } = props;

  const {
    multiSelect = false,
    searchPlaceholder = t('searchPlaceHolder', 'asurgentui'),
  } = inputProps;

  const tableHook = useTableHook();

  const [value, setValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (multiSelect) {
      setValue(props.value || []);
    } else {
      setValue(props.value || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  useEffect(() => {
    tableHook.registerFilterFetchCallback((payload, onSuccess) => {
      onSuccess({ [name]: options.map((opt) => ({ value: opt.value })) });
    });
    tableHook.parentReady();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const parsers = {
    filterItem: (filters) => filters,
    filterKey: (filters) => filters,
    label: (filters) => filters,
  };

  const filterHook = useFilterHook([{ label: name, facetKey: name }], tableHook, parsers);
  const groupHook = useFilterGroupHook(tableHook, filterHook, name, () => {});

  const handleChange = ({ value: filterValue, matched }) => {
    if (multiSelect) {
      const newArr = matched === true
        ? [...value, filterValue]
        : value.filter((val) => val !== filterValue);

      setValue(newArr);
      dispatchEvent(newArr, ref);
      groupHook.onSearchOptions({ searchQuery: '' });
    } else {
      setValue(filterValue);
      groupHook.setOpen(false);
      dispatchEvent(filterValue, ref);
    }
    setSearchValue('');
  };

  const showTags = multiSelect && value.length > 0;
  return (
    <C.SelectFilter>
      <C.InputWrapper onClick={() => groupHook.setOpen(true)}>
        <C.Input
          type="text"
          hideText={showTags}
          placeholder={placeholder}
          name={name}
          ref={ref}
          disabled
          value={value}
          {...props.props}
        />
        {showTags && <Tag.Collection tags={value.map((val) => ({ value: val }))} max={3} />}
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

FilterInput.defaultProps = defaultProps;
FilterInput.propTypes = propTyps;
FilterInput.displayName = '@asurgent.ui.Form.Input.FilterInput';

export default withTheme(FilterInput);
