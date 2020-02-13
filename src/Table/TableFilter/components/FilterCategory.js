import React from 'react';
import PropTypes from 'prop-types';
import { RingSpinner } from 'react-spinners-kit';
import { withTheme } from 'styled-components';
import * as Form from '../../../Form';
import * as Button from '../../../Button';
import * as Shield from '../../../Shield';
import * as C from './FilterCategory.styled';
import * as Transition from '../../../Transition';
import FilterItem from './FilterItem';
import useFilterGroupHook from '../useFilterGroupHook';

const propTypes = {
  label: PropTypes.string.isRequired,
  filterHook: PropTypes.instanceOf(Object).isRequired,
  tableHook: PropTypes.instanceOf(Object).isRequired,
  filterKey: PropTypes.string.isRequired,
  theme: PropTypes.instanceOf(Object),
};

const defaultProps = {
  theme: {},
};

const FilterCategory = withTheme(({
  label,
  filterHook,
  tableHook,
  filterKey,
  theme,
}) => {
  const groupHook = useFilterGroupHook(tableHook, filterHook, filterKey);
  const formData = Form.useFormBuilder({
    search: {
      type: 'text', value: '', noLabel: true,
    },
  });

  return (
    <C.FilterWrapper>
      <Button.Filter onClick={() => groupHook.setOpen(true)}>{label}</Button.Filter>
      <Shield.Transparent onClick={() => groupHook.setOpen(false)} shieldIsUp={groupHook.isOpen()}>
        <Transition.FadeInSlideDown isVisible={groupHook.isOpen()} timeout={80}>
          <C.Dropdown>
            { !filterHook.isReady
            && (
              <C.Center>
                <RingSpinner color={theme.blue400} size={24} />
              </C.Center>
            ) }
            { filterHook.isReady && (
              <>
                <C.Header>
                Filter by
                  {' '}
                  {label}
                </C.Header>
                <C.Search>
                  <Form.Primary
                    form={formData}
                    onChange={groupHook.onSearchOptions}
                  >
                    {({ search }) => (
                      <>
                        {search}
                      </>
                    )}
                  </Form.Primary>
                </C.Search>
                {
                  groupHook.hasOptions() && groupHook.getOptions().length === 0 && (
                    <C.Center>
                      <i>No matches</i>
                    </C.Center>
                  )
                }
                <C.List>
                  {
                    groupHook.getOptions().map(({ value, included, excluded }) => (
                      <FilterItem
                        key={value}
                        onClick={(state) => {
                          filterHook.updateFilterItemState(filterKey, value, state);
                        }}
                        included={included}
                        excluded={excluded}
                        value={value}
                      />
                    ))
                  }
                </C.List>
              </>
            )}
          </C.Dropdown>
        </Transition.FadeInSlideDown>
      </Shield.Transparent>
    </C.FilterWrapper>
  );
});

FilterCategory.propTypes = propTypes;
FilterCategory.defaultProps = defaultProps;
FilterCategory.displayName = '@asurgent.ui.Table.TableFilter.FilterCategory';

export default FilterCategory;
