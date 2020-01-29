import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { sortDirection as direction } from '../helpers';
import * as Form from '../../Form';
import * as Button from '../../Button';
import * as C from './TableSearchBar.styled';

const searchForm = (searchLabel, sortLabel, provider) => ({
  search: {
    type: 'text', label: searchLabel, value: provider.getQuery(),
  },
  sortDirection: {
    type: 'select', label: sortLabel, options: provider.getSortKeys(),
  },
});

const propTypes = {
  provider: PropTypes.instanceOf(Object).isRequired,
  searchLabel: PropTypes.string,
  sortLabel: PropTypes.string,
};

const defaultProps = {
  searchLabel: '',
  sortLabel: '',
};

const TableSearchBar = (props) => {
  const { provider, searchLabel, sortLabel } = props;
  const formData = Form.useFormBuilder(searchForm(searchLabel, sortLabel, provider));
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

  return (
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
                  icon={<i className={`fas fa-sort-amount-${sort === direction.asc ? 'up' : 'down'}`} />}
                />
              </C.SortInput>
            )}
          </C.StyleForm>
        </>
      )}
    </Form.Primary>
  );
};

TableSearchBar.propTypes = propTypes;
TableSearchBar.defaultProps = defaultProps;

export default TableSearchBar;
