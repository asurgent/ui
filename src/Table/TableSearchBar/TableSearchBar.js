import { isMobile } from 'react-device-detect';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Primary as Form, useFormBuilder } from '../../Form';
import * as C from './TableSearchBar.styled';
import translation from './TableSearchbar.translation';

const propTypes = {
  tableHook: PropTypes.instanceOf(Object).isRequired,
  searchHook: PropTypes.instanceOf(Object).isRequired,
  searchLabel: PropTypes.string,
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
};

const defaultProps = {
  searchLabel: '',
  className: '',
  autoFocus: true,
};

const TableSearchBar = (props) => {
  const {
    tableHook, searchHook, searchLabel, className, autoFocus,
  } = props;
  const { t } = translation;
  const formData = useFormBuilder({
    search: {
      type: 'text',
      placeholder: searchLabel || t('placeholder', 'asurgentui'),
      value: '',
      noLabel: true,
      /* props: { autoFocus: true }, */
      classNameWrapper: 'custom-table-search',
    },
  });

  useEffect(() => {
    if (tableHook.isLoading) {
      formData.blurField('search');
    } else if (!isMobile && autoFocus === true) {
      formData.focusOnField('search');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableHook.isLoading]);

  useEffect(() => {
    if (searchHook.isReady) {
      formData.updateField('search', { value: searchHook.getQuery() });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchHook.isReady]);

  useEffect(() => {
    formData.updateField('search', { placeholder: searchLabel || t('placeholder', 'asurgentui') });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchLabel]);

  return (
    <C.SearchBarContainer>
      <Form
        form={formData}
        className={className}
        onKeyUpTimer={({ values }) => {
          searchHook.setQuery(values.search);
        }}
      >
        {({ fields: { search } }) => search}
      </Form>
      {tableHook.isLoading && <C.SearchBarBlocker />}
    </C.SearchBarContainer>
  );
};

TableSearchBar.propTypes = propTypes;
TableSearchBar.defaultProps = defaultProps;

export default TableSearchBar;
