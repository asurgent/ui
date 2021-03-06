import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import MdiIcon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import * as Spinner from '../../../Spinner';
import * as Form from '../../../Form';
import * as VirtualRender from '../../../VirtualRender';
import * as Button from '../../../Button';
import * as C from './FilterCategory.styled';
import * as Transition from '../../../Transition';
import FilterItem from './FilterItem';
import useFilterGroupHook from '../useFilterGroupHook';

const propTypes = {
  label: PropTypes.string.isRequired,
  filterHook: PropTypes.instanceOf(Object).isRequired,
  tableHook: PropTypes.instanceOf(Object).isRequired,
  filterKey: PropTypes.string.isRequired,
  multiSelect: PropTypes.bool.isRequired,
  theme: PropTypes.instanceOf(Object),

  onChange: PropTypes.func,
  onAdd: PropTypes.func,
};

const defaultProps = {
  theme: {},
  onChange: () => {},
  onAdd: () => {},
};

const FilterCategory = (props) => {
  const {
    label,
    filterHook,
    tableHook,
    filterKey,
    multiSelect,
    onChange,
    onAdd,
    theme,
  } = props;

  const groupHook = useFilterGroupHook(tableHook, filterHook, filterKey, onChange);
  const form = Form.useFormBuilder({
    searchQuery: {
      type: 'text',
      value: '',
      noLabel: true,
      props: { autoFocus: true },
    },
  });

  return (
    <C.FilterWrapper active={groupHook.hasSelectedOptions()}>
      <Button.Filter onClick={() => groupHook.setOpen(true)}>{label}</Button.Filter>
      <C.ShieldTargetWrapper>
        <Transition.FadeInSlideDownOnDesktop
          timeout={80}
          isVisible={groupHook.isOpen()}
          withClickShield={() => groupHook.setOpen(false)}
        >
          <C.Dropdown>
            {
              tableHook.isFilterLoading && (
                <C.Center>
                  <Spinner.Ring size={24} color={theme.blue900} />
                </C.Center>
              )
            }
            {
              !tableHook.isFilterLoading && filterHook.isReady && (
                <>
                  <C.Search>
                    <Form.Primary
                      form={form}
                      msTimer={150}
                      onKeyUpTimer={groupHook.onSearchOptions}
                    >
                      {({ fields: { searchQuery } }) => (searchQuery)}
                    </Form.Primary>
                  </C.Search>
                  <C.ListWrapper>
                    {
                      groupHook.getOptions().length > 0 && (
                        <VirtualRender.List
                          rowHeight={48}
                          items={groupHook.getOptions()}
                          style={{ flex: 1 }}
                        >
                          {(filter, key) => (
                            <FilterItem
                              key={key}
                              onChange={onChange}
                              onAdd={onAdd}
                              multiSelect={multiSelect}
                              filterItem={filter}
                              groupHook={groupHook}
                              filterHook={filterHook}
                            />
                          )}
                        </VirtualRender.List>
                      )
                    }
                  </C.ListWrapper>
                </>
              )
            }

            <Button.Icon
              className="close"
              onClick={() => groupHook.setOpen(false)}
              icon={<MdiIcon size={0.75} path={mdiClose} />}
            />
          </C.Dropdown>
        </Transition.FadeInSlideDownOnDesktop>
      </C.ShieldTargetWrapper>
    </C.FilterWrapper>
  );
};

FilterCategory.propTypes = propTypes;
FilterCategory.defaultProps = defaultProps;

export default withTheme(FilterCategory);
