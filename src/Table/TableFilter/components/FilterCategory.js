import React from 'react';
import PropTypes from 'prop-types';
import { RingSpinner } from 'react-spinners-kit';
import { withTheme } from 'styled-components';
import * as Icon from '@material-ui/icons';
import * as Form from '../../../Form';
import * as VirtualRender from '../../../VirtualRender';
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

const FilterCategory = withTheme((props) => {
  const {
    label,
    filterHook,
    tableHook,
    filterKey,
    theme,
  } = props;
  const groupHook = useFilterGroupHook(tableHook, filterHook, filterKey);
  // ToDO: Fix so we only need one form-hook
  const desktopForm = Form.useFormBuilder({
    search: {
      type: 'text', value: '', noLabel: true,
    },
  });
  const mobileForm = Form.useFormBuilder({
    search: {
      type: 'text', value: '', noLabel: true,
    },
  });

  const content = (form) => (
    <>
      {
        !filterHook.isReady && (
          <C.Center>
            <RingSpinner color={theme.blue400} size={24} />
          </C.Center>
        )
      }
      {
        filterHook.isReady && (
          <>
            <C.Header>
              {`Filter ${label}`}
            </C.Header>
            <C.Search>
              <Form.Primary
                form={form}
                msTimer={200}
                onKeyUpTimer={groupHook.onSearchOptions}
              >
                {({ search }) => (search)}
              </Form.Primary>
            </C.Search>
            {
              groupHook.hasOptions() && groupHook.getOptions().length === 0 && (
                <C.Center>
                  <i>No matches</i>
                </C.Center>
              )
            }
            {
              groupHook.getOptions().length > 0 && (
                <VirtualRender.List rowHeight={48} items={groupHook.getOptions()} style={{ flex: 1 }}>
                  {(filter, key) => (
                    <FilterItem
                      key={key}
                      onClick={(state) => {
                        filterHook.updateFilterItemState(filterKey, filter.value, state);
                      }}
                      included={filter.included}
                      excluded={filter.excluded}
                      value={filterHook.getLabel(filter, filterKey)}
                    />
                  )}
                </VirtualRender.List>
              )
            }
          </>
        )
      }
    </>
  );

  return (
    <C.FilterWrapper>
      <Button.Filter onClick={() => groupHook.setOpen(true)}>{label}</Button.Filter>
      <Shield.Transparent onClick={() => groupHook.setOpen(false)} shieldIsUp={groupHook.isOpen()}>
        <C.Desktop>
          <Transition.FadeInSlideDown isVisible={groupHook.isOpen()} timeout={80}>
            <C.DesktopDropdown>
              {content(desktopForm)}
            </C.DesktopDropdown>
          </Transition.FadeInSlideDown>
        </C.Desktop>
        <C.Mobile>
          <Transition.FadeIn isVisible={groupHook.isOpen()} timeout={80}>
            <C.MobileDropdown>
              <Button.Icon className="close" onClick={() => groupHook.setOpen(false)} icon={<Icon.Close fontSize="large" />} />
              <C.MobileContent>
                {content(mobileForm)}
              </C.MobileContent>
            </C.MobileDropdown>
          </Transition.FadeIn>
        </C.Mobile>
      </Shield.Transparent>
    </C.FilterWrapper>
  );
});

FilterCategory.propTypes = propTypes;
FilterCategory.defaultProps = defaultProps;
FilterCategory.displayName = '@asurgent.ui.Table.TableFilter.FilterCategory';

export default FilterCategory;
