import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Icon from '@material-ui/icons';
import { sortDirection as direction } from '../helpers';
import * as Form from '../../Form';
import * as Button from '../../Button';
import TableFilter from '../TableFilter';
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
  provider: PropTypes.instanceOf(Object).isRequired,
  searchLabel: PropTypes.string,
};

const defaultProps = {
  searchLabel: '',
};

const TableSearchBar = (props) => {
  const { provider, searchLabel } = props;
  const formData = Form.useFormBuilder(searchForm(searchLabel, provider));
  const [sort, setSort] = useState(provider.getSortDirection());
  const [sortKey, setSortKey] = useState(provider.getSortKey());
  const [query, setQuery] = useState(provider.getQuery());

  useEffect(() => {
    formData.updateField('search', { props: { disabled: provider.isLoading } });
    formData.updateField('sortDirection', { props: { disabled: provider.isLoading } });
  }, [provider.isLoading]);

  useEffect(() => {
    const { dirty } = formData.getValues();
    if (dirty) {
      provider.onSort({ value: sortKey, direction: sort });
    }
  }, [sort, sortKey]);

  useEffect(() => {
    const { dirty } = formData.getValues();
    if (dirty) {
      provider.onSearch(query);
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
              { sortDirection && provider.hasSortyKeys() && (
              <C.SortInput>
                {sortDirection}
                <Button.Icon
                  disabled={provider.isLoading}
                  onClick={() => setSort(sort === direction.asc ? direction.desc : direction.asc)}
                  icon={sort === direction.asc ? <Icon.ArrowDownward /> : <Icon.ArrowUpward />}
                />
              </C.SortInput>
              )}
              {provider.hasFilter() && (
                <C.Filter>
                  <TableFilter provider={provider} />
                </C.Filter>
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
