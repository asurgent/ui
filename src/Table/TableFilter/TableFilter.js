import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { RingSpinner } from 'react-spinners-kit';
import * as Icons from '@material-ui/icons';
import { withTheme } from 'styled-components';
import * as Form from '../../Form';
import * as Button from '../../Button';
import * as Shield from '../../Shield';
import * as C from './TableFilter.styled';
import * as Transition from '../../Transition';
import {
  EXCLUDE,
  INCLUDE,
  REMOVE,
} from '../hooks/helpers';

const propTypes = {
  provider: PropTypes.instanceOf(Object),
};

const defaultProps = {};


const FilterItem = ({
  included,
  excluded,
  value: label,
  onClick,
}) => (
  <C.FilterItem>
    <C.Active>
      {included && <Icons.Check />}
      {excluded && <Icons.Block />}
    </C.Active>
    <Button.Plain className="filter-label" onClick={() => onClick(included ? REMOVE : INCLUDE)}>
      {label}
    </Button.Plain>
    <Button.Plain tooltip="exclude" onClick={() => onClick(excluded ? REMOVE : EXCLUDE)}>
      <C.Exclude>
        <Icons.RemoveCircleOutline />
      </C.Exclude>
    </Button.Plain>
  </C.FilterItem>
);

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
    <C.Filter>
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
    </C.Filter>
  );
});

const TableFilter = ({ filterHook }) => (
  <C.Wrapper>
    {
        filterHook.getFilterCategories()
          .map(({ label, facetKey }) => (
            label && facetKey && (
            <FilterCategory
              key={facetKey}
              label={label}
              filterKey={facetKey}
              filterHook={filterHook}
            />
            )
          ))
      }
  </C.Wrapper>
);
TableFilter.propTypes = propTypes;
TableFilter.defaultProps = defaultProps;
TableFilter.displayName = '@asurgent.ui.Table.TableFilter';

export default TableFilter;
