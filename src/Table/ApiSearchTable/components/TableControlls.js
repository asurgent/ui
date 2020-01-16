import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { sortDirection as direction } from '../../helpers';
import { sortDirectionToString, parseInitialSort } from '../helpers';
import * as Form from '../../../Form';
import * as Button from '../../../Button';
import * as C from './TableControlls.styled';

const searchForm = (searchLabel, sortKeys, provider) => ({
  search: {
    type: 'text', label: searchLabel, value: provider.getQuery(),
  },
  sortDirection: {
    type: 'select', label: 'sort', options: sortKeys,
  },
});

const propTypes = {
  provider: PropTypes.instanceOf(Object).isRequired,
  initialSort: PropTypes.instanceOf(Object),
  searchLabel: PropTypes.string,
  sortKeys: PropTypes.instanceOf(Array),
};

const defaultProps = {
  searchLabel: '',
  sortKeys: [],
  initialSort: null,
};

const TableControlls = (props) => {
  const {
    provider, searchLabel, sortKeys, initialSort,
  } = props;

  const formData = Form.useFormBuilder(searchForm(searchLabel, sortKeys, provider));
  const [sort, setSort] = useState(parseInitialSort(initialSort));

  useEffect(() => {
    formData.updateField('search', { props: { disabled: provider.isLoading } });
    formData.updateField('sortDirection', { props: { disabled: provider.isLoading } });
  }, [provider.isLoading]);

  useEffect(() => {
    const { values: { sortDirection } } = formData.getValues();
    if (sortDirection) {
      provider.onSort([`${sortDirection} ${sortDirectionToString(sort)}`]);
      provider.update();
    }
  }, [sort]);

  return (
    <Form.Primary
      form={formData}
      onNewValue={(values) => {
        provider.onSort([`${values.sortDirection} ${sortDirectionToString(sort)}`]);
        provider.onSearch(values.search);
        provider.update();
      }}
    >
      {({ search, sortDirection }) => (
        <>
          <C.StyleForm>
            {search}
            { sortDirection && initialSort && (
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
