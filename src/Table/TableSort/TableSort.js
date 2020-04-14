import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
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
      className={className}
      form={formData}
      onChangeTimer={(values) => {
        const selectedSortKey = values.sortKey;
        sortHook.setCurrentSortKey(selectedSortKey);
      }}
    >
      {({ sortKey }) => (
        <SortWrapper>
          {sortKey}
          <Button.Icon
            disabled={tableHook.isLoading}
            onClick={() => sortHook.toggleCurrentSortDirection()}
            icon={direction ? <ArrowDownward /> : <ArrowUpward />}
          />
        </SortWrapper>
      )}
    </Form>
  );
};

TableSort.propTypes = propTypes;
TableSort.defaultProps = defaultProps;
TableSort.displayName = '@asurgent.ui.Table.Sort';

export default TableSort;
