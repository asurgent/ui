import React, {
  createRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
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
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.instanceOf(Object),
      PropTypes.string]),
  ).isRequired,
  props: PropTypes.instanceOf(Object),
  theme: PropTypes.instanceOf(Object),
  parseOutput: PropTypes.func,
  placeholder: PropTypes.string,
  validator: PropTypes.shape({
    condition: PropTypes.func,
    errorMessage: PropTypes.string,
  }),
  disabled: PropTypes.func,
  onChange: PropTypes.func,
};

const defaultProps = {
  value: '',
  props: { },
  theme: {},
  parseOutput: (r) => r,
  placeholder: '',
  validator: {
    condition: () => true,
    errorMessage: '',
  },
  disabled: () => false,
  onChange: () => null,
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
    value,
    options,
    validator,
    placeholder,
    parseOutput,
    props: inputProps,
    disabled,
    onChange,
  } = props;

  const placeholdeOutput = placeholder || t('selectPlaceholder', 'asurgentui');
  const searchInput = createRef();
  const { multiSelect } = inputProps;
  const filterSelectHook = useFilterSelectHook(
    value,
    options,
    multiSelect,
    parseOutput,
    placeholder,
  );

  const handleChange = (item) => {
    const selected = filterSelectHook.selectItem(item);
    onChange({ inputName: name, inputValue: selected });
    dispatchEvent(selected, filterSelectHook.inputRef);
  };

  useImperativeHandle(ref, () => ({
    validator: () => validator.condition(value),
    validationErrorMessage: validator.errorMessage,
    value: () => filterSelectHook.getInputValue(),
    focus: () => {
      filterSelectHook.setOpen(true);
      searchInput.current.focus();
    },
    blur: () => {
      filterSelectHook.setOpen(false);
      searchInput.current.blur();
    },
  }));

  return (
    <Shield.OutsideEvent onClick={() => filterSelectHook.setOpen(false)}>
      <C.SelectFilter onClick={() => !disabled() && filterSelectHook.setOpen(true)}>
        <C.Input type="text" name={name} ref={filterSelectHook.inputRef} disabled {...inputProps} />
        <C.Output>
          <C.Value disabled={disabled()} asPlaceholder={filterSelectHook.showPlaceHolder()}>
            { filterSelectHook.showTags() && (
              <Tag.Collection tags={filterSelectHook.getTags()} max={3} />
            )}
            { filterSelectHook.showPlaceHolder() && placeholdeOutput}
            {!filterSelectHook.showTags() && (filterSelectHook.getOutput())}
          </C.Value>
          <Icons.ArrowDropDown className="down-arrow" fontSize="large" />
        </C.Output>
        <Transition.FadeInFitted isVisible={filterSelectHook.isOpen} timeout={80}>
          <C.Dropdown>
            <C.SearchWrapper>
              <C.Search
                forwardRef={searchInput}
                type="text"
                placeholder={inputProps.searchPlaceholder || t('searchPlaceHolder', 'asurgentui')}
                value={filterSelectHook.searchValue}
                onChange={({ target }) => {
                  filterSelectHook.setSearch(target.value);
                }}
              />
            </C.SearchWrapper>
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
      </C.SelectFilter>
    </Shield.OutsideEvent>
  );
});

FilterInput.defaultProps = defaultProps;
FilterInput.propTypes = propTyps;
FilterInput.displayName = '@asurgent.ui.Form.Input.FilterSelect';

export default FilterInput;
