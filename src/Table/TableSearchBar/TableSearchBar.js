import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Primary as Form, useFormBuilder } from '../../Form';
import useSearchbarHook from './useSearchbarHook';

const propTypes = {
  tableHook: PropTypes.instanceOf(Object),
  searchLabel: PropTypes.string,
};

const defaultProps = {
  tableHook: {},
  searchLabel: '',
};

const TableSearchBar = (props) => {
  const { tableHook, searchLabel } = props;
  const searchHook = useSearchbarHook(tableHook);
  const formData = useFormBuilder({
    search: {
      type: 'text', placeholder: searchLabel, value: searchHook.getQuery(), noLabel: true,
    },
  });

  useEffect(() => {
    formData.updateField('search', { props: { disabled: tableHook.isLoading } });
  }, [tableHook.isLoading]);

  useEffect(() => {
    formData.updateField('search', { placeholder: searchLabel });
  }, [searchLabel]);

  return (
    <Form
      form={formData}
      onNewValue={(values) => {
        searchHook.setQuery(values.search);
      }}
    >
      {({ search }) => search}
    </Form>
  );
};

TableSearchBar.propTypes = propTypes;
TableSearchBar.defaultProps = defaultProps;
TableSearchBar.displayName = '@asurgent.ui.Table.Searchbar';

export default TableSearchBar;
