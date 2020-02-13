import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Primary as Form, useFormBuilder } from '../../Form';

const propTypes = {
  tableHook: PropTypes.instanceOf(Object).isRequired,
  searchHook: PropTypes.instanceOf(Object).isRequired,
  searchLabel: PropTypes.string,
};

const defaultProps = {
  searchLabel: '',
};

const TableSearchBar = (props) => {
  const { tableHook, searchHook, searchLabel } = props;
  const formData = useFormBuilder({
    search: {
      type: 'text', placeholder: searchLabel, value: '', noLabel: true,
    },
  });

  useEffect(() => {
    formData.updateField('search', { props: { disabled: tableHook.isLoading } });
  }, [tableHook.isLoading]);

  useEffect(() => {
    if (searchHook.isReady) {
      formData.updateField('search', { value: searchHook.getQuery() });
    }
  }, [searchHook.isReady]);

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
