import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import MdiIcon from '@mdi/react';
import { mdiArrowDown, mdiArrowUp } from '@mdi/js';
import { Primary as Form, useFormBuilder } from '../../Form';
import * as Button from '../../Button';
import { SortWrapper } from './TableSort.styled';

const propTypes = {
  tableHook: PropTypes.instanceOf(Object).isRequired,
  sortHook: PropTypes.instanceOf(Object).isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

const TableSort = (props) => {
  const { tableHook, sortHook, className } = props;
  const formData = useFormBuilder({
    sortKey: {
      type: 'select',
      options: sortHook.getOptions(),
      noLabel: true,
      classNameWrapper: 'custom-table-sort-select',
    },
  });

  useEffect(() => {
    formData.updateField('sortKey', { props: { disabled: tableHook.isLoading } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableHook.isLoading]);

  useEffect(() => {
    if (sortHook.isReady) {
      formData.updateField('sortKey', { value: sortHook.getCurrentSortKey() });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortHook.isReady]);

  const direction = sortHook.currentSortDirectionIsAscending();
  if (!sortHook.hasOptions()) {
    return null;
  }

  return (
    <Form
      className={className}
      form={formData}
      onChangeTimer={({ values }) => {
        const selectedSortKey = values.sortKey;
        sortHook.setCurrentSortKey(selectedSortKey);
      }}
    >
      {({ fields: { sortKey } }) => (
        <SortWrapper>
          {sortKey}
          <Button.Icon
            disabled={tableHook.isLoading}
            onClick={() => sortHook.toggleCurrentSortDirection()}
            icon={
              <MdiIcon size={1.2} path={direction ? mdiArrowDown : mdiArrowUp} />
            }
          />
        </SortWrapper>
      )}
    </Form>
  );
};

TableSort.propTypes = propTypes;
TableSort.defaultProps = defaultProps;

export default TableSort;
