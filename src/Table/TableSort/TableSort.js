import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Icon from '@material-ui/icons';
import { Primary as Form, useFormBuilder } from '../../Form';
import * as Button from '../../Button';
import useSortHook from './useSortHook';

const propTypes = {
  tableHook: PropTypes.instanceOf(Object).isRequired,
  searchLabel: PropTypes.string,
};

const defaultProps = {
  tableHook: {},
  searchLabel: '',
};

const TableSort = (props) => {
  const { tableHook, sortKeys } = props;

  const sortHook = useSortHook(sortKeys, tableHook);
  const formData = useFormBuilder({
    sortDirection: {
      type: 'select', options: sortHook.getSortKeyOptions(), noLabel: true,
    },
  });

  useEffect(() => {
    formData.updateField('sortDirection', { props: { disabled: tableHook.isLoading } });
  }, [tableHook.isLoading]);

  const direction = sortHook.currentSortDirectionIsAscending();
  if (!sortHook.hasSortKeyOptions()) {
    return null;
  }

  return (
    <Form
      form={formData}
      onNewValue={(values) => {
        sortHook.setCurrentSortKey(values.sortDirection);
      }}
    >
      {({ sortDirection }) => (
        <div>
          {sortDirection}
          <Button.Icon
            disabled={tableHook.isLoading}
            onClick={() => sortHook.toggleCurrentSortDirection()}
            icon={direction ? <Icon.ArrowDownward /> : <Icon.ArrowUpward />}
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
