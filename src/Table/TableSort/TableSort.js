import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { Primary as Form, useFormBuilder } from '../../Form';
import * as Button from '../../Button';
import useSortHook from './useSortHook';

const propTypes = {
  tableHook: PropTypes.instanceOf(Object).isRequired,
  sortKeys: PropTypes.instanceOf(Array).isRequired,
};

const defaultProps = {};

const TableSort = (props) => {
  const { tableHook, sortKeys } = props;

  const sortHook = useSortHook(sortKeys, tableHook);
  const formData = useFormBuilder({
    sortKey: {
      type: 'select', options: sortHook.getOptions(), noLabel: true,
    },
  });

  useEffect(() => {
    formData.updateField('sortKey', { props: { disabled: tableHook.isLoading } });
  }, [tableHook.isLoading]);


  useEffect(() => {
    if (sortHook.isReady) {
      formData.updateField('sortKey', { value: sortHook.getCurrentSortKey() });
    }
  }, [sortHook.isReady]);


  const direction = sortHook.currentSortDirectionIsAscending();
  if (!sortHook.hasOptions()) {
    return null;
  }

  return (
    <Form
      form={formData}
      onNewValue={(values) => {
        const selectedSortKey = values.sortKey;
        sortHook.setCurrentSortKey(selectedSortKey);
      }}
    >
      {({ sortKey }) => (
        <div>
          {sortKey}
          <Button.Icon
            disabled={tableHook.isLoading}
            onClick={() => sortHook.toggleCurrentSortDirection()}
            icon={direction ? <ArrowDownward /> : <ArrowUpward />}
          />
        </div>
      )}
    </Form>
  );
};

TableSort.propTypes = propTypes;
TableSort.defaultProps = defaultProps;
TableSort.displayName = '@asurgent.ui.Table.Sort';

export default TableSort;
