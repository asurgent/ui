import React, {
  forwardRef, useState, useEffect, useRef,
} from 'react';
import PropTypes from 'prop-types';
import Portal from '@material-ui/core/Portal';
import { withTheme } from 'styled-components';
import * as Icons from '@material-ui/icons';
import * as Table from '../../Table';
import * as Spinner from '../../Spinner';
import * as VirtualRender from '../../VirtualRender';
import * as Shield from '../../Shield';
import * as Transition from '../../Transition';
import * as C from '../../Table/TableFilter/components/FilterCategory.styled';
import * as S from './Select.styled';
import * as Form from '../index';
import FilterItem from '../../Table/TableFilter/components/FilterItem';
import useFilterGroupHook from '../../Table/TableFilter/useFilterGroupHook';
import useFilterHook from '../../Table/TableFilter/useFilterHook';

const propTyps = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  props: PropTypes.instanceOf(Object),
  theme: PropTypes.instanceOf(Object),
};

const defaultProps = {
  value: '',
  props: {},
  theme: {},
};

const getDefaultSort = (sortKeys) => {
  if (Array.isArray(sortKeys) && sortKeys.length > 0) {
    const sort = sortKeys.find(({ default: sortByDefault }) => sortByDefault);

    if (sort) {
      return sort.value;
    }

    const first = sortKeys[0];
    return first.value;
  }
  return null;
};

const Select = forwardRef((props, ref) => {
  const {
    name,
    options,
    theme,
  } = props;
  const useSearch = props?.props?.withSearch;

  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(props.value || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add a portal since a form can't be a descendant of a form
  const portalRef = useRef(null);

  const tableHook = Table.useTableHook();

  useEffect(() => {
    tableHook.registerFilterFetchCallback((payload, onSuccess) => {
      onSuccess({ [name]: options.map((opt) => ({ value: opt.value })) });
    });
    tableHook.parentReady();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  useEffect(() => {
    setValue(getDefaultSort(options));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const parsers = {
    filterItem: (filters) => filters,
    filterKey: (filters) => filters,
    label: (filters) => filters,
  };

  const filterHook = useFilterHook([{ label: name, facetKey: name }], tableHook, parsers);
  const groupHook = useFilterGroupHook(tableHook, filterHook, name, () => {});
  const form = Form.useFormBuilder({
    searchQuery: {
      type: 'text', value: '', noLabel: true, props: { autoFocus: true },
    },
  });

  if (useSearch) {
    return (
      <S.SelectFilter onClick={() => { groupHook.setOpen(!groupHook.isOpen()); }}>
        <S.Input
          type="text"
          disabled
          name={name}
          ref={ref}
          value={value}
          {...props.props}
        />
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
                <C.Search ref={portalRef}>
                  <Portal container={portalRef.current}>
                    <Form.Primary
                      form={form}
                      msTimer={150}
                      onKeyUpTimer={groupHook.onSearchOptions}
                    >
                      {({ searchQuery }) => (searchQuery)}
                    </Form.Primary>
                  </Portal>
                </C.Search>

                <C.ListWrapper>
                  {groupHook.getOptions().length > 0 && (
                    <VirtualRender.List
                      rowHeight={48}
                      items={groupHook.getOptions()}
                      style={{ flex: 1 }}
                    >
                      {(filter, key) => (
                        <FilterItem
                          key={key}
                          multiSelect={false}
                          onChange={({ value: filterValue }) => setValue(filterValue)}
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
      </S.SelectFilter>
    );
  }

  return (
    <>
      <select
        {...props.props}
        type="select"
        onChange={({ target }) => setValue(target.value)}
        value={value}
        name={name}
        ref={ref}
      >
        { Array.isArray(options) && options
          .map(({
            value: optionValue,
            label: optionLabel,
            disabled,
            disabledPreFix,
            disabledPostFix,
          }) => (
            <option key={`${optionLabel}-${value}`} value={optionValue} disabled={disabled}>
              {disabled && disabledPreFix}
              {optionLabel}
              {disabled && disabledPostFix}
            </option>
          ))}
      </select>
      <Icons.ArrowDropDown className="down-arrow" fontSize="large" />
    </>
  );
});

Select.defaultProps = defaultProps;
Select.propTypes = propTyps;
Select.displayName = '@asurgent.ui.Form.Input.Select';

export default withTheme(Select);
