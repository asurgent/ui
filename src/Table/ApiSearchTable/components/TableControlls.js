import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { sortDirection as direction } from '../../helpers';
import * as Form from '../../../Form';
import * as Button from '../../../Button';
import * as C from './TableControlls.styled';

const searchForm = (searchLabel, provider) => ({
  search: {
    type: 'text', label: searchLabel, value: provider.getQuery(),
  },
  sortDirection: {
    type: 'select', label: 'sort', options: provider.getSortKeys(),
  },
});

const propTypes = {
  provider: PropTypes.instanceOf(Object).isRequired,
  searchLabel: PropTypes.string,
};

const defaultProps = {
  searchLabel: '',
};

const TableControlls = (props) => {
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
            {search}
            { sortDirection && provider.hasSortyKeys() && (
              <div className="sort">
                {sortDirection}
                <Button.Icon
                  disabled={provider.isLoading}
                  onClick={() => setSort(sort === direction.asc ? direction.desc : direction.asc)}
                  icon={<i className={`fas fa-sort-amount-${sort === direction.asc ? 'up' : 'down'}`} />}
                />
              </div>
            )}
          </C.StyleForm>
        </>
      )}
    </Form.Primary>
  );
};

TableControlls.propTypes = propTypes;
TableControlls.defaultProps = defaultProps;

export default TableControlls;
