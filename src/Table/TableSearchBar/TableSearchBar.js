import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Icon from '@material-ui/icons';
import { sortDirection as direction } from '../helpers';
import * as Form from '../../Form';
import * as Button from '../../Button';
import * as C from './TableSearchBar.styled';

const searchForm = (searchLabel, provider) => ({
  search: {
    type: 'text', placeholder: searchLabel, value: provider.getQuery(), noLabel: true,
  },
  sortDirection: {
    type: 'select', options: provider.getSortKeys(), noLabel: true,
  },
});

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
  const formData = Form.useFormBuilder(searchForm(searchLabel, tableHook));
  const [sort, setSort] = useState(tableHook.getSortDirection());
  const [sortKey, setSortKey] = useState(tableHook.getSortKey());
  const [query, setQuery] = useState(tableHook.getQuery());

  useEffect(() => {
    formData.updateField('search', { props: { disabled: tableHook.isLoading } });
    formData.updateField('sortDirection', { props: { disabled: tableHook.isLoading } });
  }, [tableHook.isLoading]);

  useEffect(() => {
    const { dirty } = formData.getValues();
    if (dirty) {
      tableHook.onSort({ value: sortKey, direction: sort });
    }
  }, [sort, sortKey]);

  useEffect(() => {
    const { dirty } = formData.getValues();
    if (dirty) {
      tableHook.onSearch(query);
    }
  }, [query]);

  useEffect(() => {
    formData.updateField('search', { placeholder: searchLabel });
  }, [searchLabel]);

  return (
    <>
      <Form.Primary
        form={formData}
        onNewValue={(values) => {
          setSortKey(values.sortDirection);
          setQuery(values.search);
        }}
      >
        {({ search, sortDirection }) => (
          <>
            <C.StyleForm>
              <C.SearchInput>
                {search}
              </C.SearchInput>
              { sortDirection && tableHook.hasSortyKeys() && (
              <C.SortInput>
                {sortDirection}
                <Button.Icon
                  disabled={tableHook.isLoading}
                  onClick={() => setSort(sort === direction.asc ? direction.desc : direction.asc)}
                  icon={sort === direction.asc ? <Icon.ArrowDownward /> : <Icon.ArrowUpward />}
                />
              </C.SortInput>
              )}
            </C.StyleForm>
          </>
        )}
      </Form.Primary>

    </>
  );
};

TableSearchBar.propTypes = propTypes;
TableSearchBar.defaultProps = defaultProps;
TableSearchBar.displayName = '@asurgent.ui.Table.Searchbar';

export default TableSearchBar;
