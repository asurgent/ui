import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Icons from '@material-ui/icons';
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

const FilterCategory = ({
  label,
  filterHook,
  filterKey,
}) => {
  const [open, setOpen] = useState(false);
  const formData = Form.useFormBuilder({
    search: {
      type: 'text', value: '', noLabel: true,
    },
  });

  const onOpen = () => {
    setOpen(true);
    filterHook.fetchFilterListItems();
  };

  const items = filterHook.getFilterItemsByKey(filterKey);

  return (
    <C.Filter>
      <Button.Filter onClick={onOpen}>{label}</Button.Filter>
      <Shield.Transparent onClick={() => setOpen(false)} shieldIsUp={open}>
        <Transition.FadeInSlideDown isVisible={open} timeout={80}>
          <C.Dropdown>
            { !filterHook.isInitated() && ('Loading') }
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
                    onNewValue={(values) => {
                      console.log(values.search);
                    }}
                  >
                    {({ search }) => (
                      <>
                        {search}
                      </>
                    )}
                  </Form.Primary>
                </C.Search>
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
};

const TableFilter = ({ filterHook }) => (
  <C.Wrapper>
    {
        filterHook.getFilterCategories()
          .map(({ label, facetKey }) => (
            <FilterCategory
              key={facetKey}
              label={label}
              filterKey={facetKey}
              filterHook={filterHook}
            />
          ))
      }
  </C.Wrapper>
);
TableFilter.propTypes = propTypes;
TableFilter.defaultProps = defaultProps;
TableFilter.displayName = '@asurgent.ui.Table.TableFilter';

export default TableFilter;
