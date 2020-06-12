import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import * as Icons from '@material-ui/icons';
import * as Spinner from '../../Spinner';
import * as VirtualRender from '../../VirtualRender';
import * as Shield from '../../Shield';
import * as Transition from '../../Transition';
/* import translation from  */
import * as C from './FilterSelect.styled';
import useTableHook from '../../Table/useTableHook';
import FilterItem from '../../Table/TableFilter/components/FilterItem';
import useFilterGroupHook from '../../Table/TableFilter/useFilterGroupHook';
import useFilterHook from '../../Table/TableFilter/useFilterHook';

const propTyps = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  props: PropTypes.instanceOf(Object),
  theme: PropTypes.instanceOf(Object),
  placeholder: PropTypes.string,
};

const defaultProps = {
  value: '',
  props: {},
  theme: {},
  placeholder: '',
};

const FilterInput = forwardRef((props, ref) => {
  const {
    name,
    options,
    theme,
    placeholder,
  } = props;

  const searchPlaceholder = props?.props?.searchPlaceholder;

  const tableHook = useTableHook();
  const [value, setValue] = useState('');

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setValue(props.value || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

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

  return (
    <C.SelectFilter>
      <C.InputWrapper onClick={() => groupHook.setOpen(true)}>
        <C.Input
          type="text"
          disabled
          placeholder={placeholder}
          onChange={() => {}}
          name={name}
          ref={ref}
          value={value || ''}
          {...props.props}
        />
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
                      multiSelect={false}
                      onChange={({ value: filterValue }) => {
                        setValue(filterValue);
                        setSearchValue('');
                        groupHook.setOpen(false);
                      }}
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
