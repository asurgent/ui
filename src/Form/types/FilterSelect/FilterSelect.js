import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import * as Icons from '@material-ui/icons';
import * as VirtualRender from '../../../VirtualRender';
import * as Shield from '../../../Shield';
import * as Tag from '../../../Tag';
import * as Transition from '../../../Transition';
import translation from './FilterSelect.translation';
import * as C from './FilterSelect.styled';
import useFilterSelectHook from './useFilterSelectHook';

import FilterSelectItem from './components/FilterSelectItem';

const { t } = translation;

const propTyps = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  props: PropTypes.instanceOf(Object),
  theme: PropTypes.instanceOf(Object),
  outputParser: PropTypes.func,
  placeholder: PropTypes.string,
};

const defaultProps = {
  value: '',
  props: { },
  theme: {},
  placeholder: t('selectPlaceholder', 'asurgentui'),
  outputParser: (res) => res,
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
    placeholder,
    value,
    outputParser,
    props: inputProps,
  } = props;

  const filterSelectHook = useFilterSelectHook(value, options, inputProps.multiSelect, outputParser);

  const handleChange = (item) => {
    const selected = filterSelectHook.selectItem(item);
    dispatchEvent(selected, ref);
  };

  return (
    <C.SelectFilter>
      <C.InputWrapper onClick={() => filterSelectHook.setOpen(true)}>
        <C.Input
          type="text"
          hideText={filterSelectHook.showTags()}
          placeholder={placeholder}
          name={name}
          ref={ref}
          disabled
          value={filterSelectHook.getInputValue()}
          {...inputProps}
        />
        { filterSelectHook.showTags() && (
          <Tag.Collection tags={filterSelectHook.getTags()} max={3} />
        )}
      </C.InputWrapper>
      <C.FilterWrapper>
        <Shield.Transparent
          onClick={() => filterSelectHook.setOpen(false)}
          shieldIsUp={filterSelectHook.isOpen}
        >
          <Transition.FadeInFitted isVisible={filterSelectHook.isOpen} timeout={80}>
            <C.Dropdown fitted>
              <C.Search>
                <C.FilterInput
                  type="text"
                  placeholder={inputProps.searchPlaceholder || t('searchPlaceHolder', 'asurgentui')}
                  value={filterSelectHook.searchValue}
                  onChange={({ target }) => {
                    filterSelectHook.setSearch(target.value);
                  }}
                />
              </C.Search>
              <C.ListWrapper>
                {
                  filterSelectHook.hasOptions() && (
                    <VirtualRender.List
                      rowHeight={48}
                      items={filterSelectHook.getOptions()}
                      style={{ flex: 1 }}
                    >
                      {(item, key) => (
                        <FilterSelectItem
                          key={key}
                          onChange={handleChange}
                          filterItem={item}
                        />
                      )}
                    </VirtualRender.List>
                  )
                }
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

export default FilterInput;
