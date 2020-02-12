import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { RingSpinner } from 'react-spinners-kit';
import { withTheme } from 'styled-components';
import * as Form from '../../../Form';
import * as Button from '../../../Button';
import * as Shield from '../../../Shield';
import * as C from './FilterCategory.styled';
import * as Transition from '../../../Transition';
import FilterItem from './FilterItem';

const propTypes = {
  label: PropTypes.string.isRequired,
  filterHook: PropTypes.instanceOf(Object).isRequired,
  filterKey: PropTypes.string.isRequired,
  theme: PropTypes.instanceOf(Object),
};

const defaultProps = {
  theme: {},
};

const FilterCategory = withTheme(({
  label,
  filterHook,
  filterKey,
  theme,
}) => {
  const [open, setOpen] = useState(false);
  const [hasItems, setHasItems] = useState(false);
  const [items, setItems] = useState([]);
  const formData = Form.useFormBuilder({
    search: {
      type: 'text', value: '', noLabel: true,
    },
  });

  const searchFilterOptions = ({ search }) => {
    const original = filterHook.getFilterItemsByKey(filterKey);

    if (search) {
      const filterd = original.filter(({ value }) => value.match(search));
      setItems(filterd);
    } else {
      setItems(original);
    }
  };

  const onOpen = () => {
    setOpen(true);
    filterHook.fetchFilterListItems();
  };

  useEffect(() => {
    const list = filterHook.getFilterItemsByKey(filterKey);
    setHasItems(list.length > 0);
    setItems(list);
  }, [filterHook.isInitated]);

  return (
    <C.FilterWrapper>
      <Button.Filter onClick={onOpen}>{label}</Button.Filter>
      <Shield.Transparent onClick={() => setOpen(false)} shieldIsUp={open}>
        <Transition.FadeInSlideDown isVisible={open} timeout={80}>
          <C.Dropdown>
            { !filterHook.isInitated()
            && (
              <C.Center>
                <RingSpinner color={theme.blue400} size={24} />
              </C.Center>
            ) }
            { filterHook.isInitated() && (
              <>
                <C.Header>
                Filter by
                  {' '}
                  {label}
                </C.Header>
                <C.Search>
                  <Form.Primary
                    form={formData}
                    onChange={searchFilterOptions}
                  >
                    {({ search }) => (
                      <>
                        {search}
                      </>
                    )}
                  </Form.Primary>
                </C.Search>
                {
                  hasItems && items.length === 0 && (
                    <C.Center>
                      <i>No matches</i>
                    </C.Center>
                  )
                }
                <C.List>
                  {
                    items.map(({ value, included, excluded }) => (
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
