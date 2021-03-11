/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  withKnobs, boolean, text,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import * as Table from './index';

const StoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3.2rem;
  height: 100vh;
  width: 100vh;
  max-width: 100%;
`;

const CardWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 6rem;
  padding: 2rem;
  border-radius: 5px;
  border: 1px solid orange;
  background: hotpink;

  .title {
    color: white;
    margin: 0;
    padding: 0;
    font-size: 2rem;
  }
`;

const propTypes = {
  row: PropTypes.instanceOf(Object),
};

const defaultProps = {
  row: {},
};

const Card = ({ row }) => {
  const { valueD, valueA } = row;

  return (
    <CardWrapper>
      <span className="title">
        {valueA}
        {valueD}
      </span>
    </CardWrapper>
  );
};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default {
  title: 'UI Components|Table',
  decorators: [withKnobs],
};

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempus eu libero ut lobortis.';

const rowDummyData = Array.from({ length: 5 }, () => ({
  valueA: 'Cell 1',
  valueB: lorem,
  valueC: 'Cell 3',
  valueD: 'Cell 4',
}));

const rowComponentOverride = ({ row }) => {
  const OverrideRow = styled(row)`
    .column-5 {
      display: none;
    }
    
    &:hover {
      .column-2 {
        grid-column: 2/4;
      }
      .column-5 {
        display: block;
      }
      .column-3,.column-4 {
        display: none;
      }
    }
  `;

  return OverrideRow;
};

const cardComponentOverride = ({ card }) => {
  const OverrideCard = styled(card)`
    background: magenta;
    border: 4px solid cyan;
    padding: 2rem;
  `;
  return OverrideCard;
};

const cellComponentOverride = ({ cell }) => {
  const OverrideCell = styled(cell)`
    padding:  3.2rem .8rem;
    &:hover {
      background: magenta;
    }
  `;

  return OverrideCell;
};

export const base = () => (
  <StoryWrapper>
    <Table.Base
      cellComponent={cellComponentOverride}
      rowComponent={rowComponentOverride}
      cardComponent={cardComponentOverride}
      emptystate={text('Emptystate', 'No items found')}
      isLoading={boolean('Loading', false)}
      zebra={boolean('Zebra', true)}
      striped={boolean('Striped', true)}
      cardView={boolean('Card view', false)}
      withHeader={boolean('With header', true)}
      withPagination={boolean('With pagination', true)}
      equalSizeColumns={boolean('Equal size column', false)}
      headerData={[
        {
          label: lorem,
          size: 'minmax(30rem, 1fr)',
        },
        { label: 'B', key: 'test' },
        { label: 'C', sortKey: 'sort-C' },
        {
          label: 'D',
          size: 'minmax(8rem, 10rem)',
          props: { style: { textAlign: 'center' } },
        },
      ]}
      rowData={boolean('With rows', true) ? rowDummyData : []}
      cardConfiguration={(row) => <Card row={row} />}
      clickRowConfigutation={(row) => ({ link: '/', onClick: action(`Click row: ${row.id}`) })}
      columnConfiguration={(row) => {
        const {
          valueA, valueB, valueC, valueD,
        } = row;

        return [
          { value: valueB },
          valueA,
          () => valueC,
          () => ({ value: valueD, props: { style: { background: 'transparent' } } }),
          () => ({ value: 'IM AM HIDDEN' }),
        ];
      }}
    />
  </StoryWrapper>
);

export const main = () => {
  const success = boolean('Successful response', true);
  const table = Table.useTableHook(({ order_by }) => ({ page_size: 15, order_by: [...order_by, 'desc user'] }));

  useEffect(() => {
    table.registerRowFetchCallback((payload, onSuccess, onFail) => {
      action('fetch')(payload);

      if (success) {
        onSuccess({
          result: [...rowDummyData],
          page: 2,
          total_pages: 20,
          total_count: 1000,
        });
      } else {
        onFail('Could not get your things');
      }
    });

    table.registerFilterFetchCallback((payload, onSuccess) => {
      onSuccess({
        guys: [
          { value: 'Mike(1133)' },
          { value: 'Keen(123)' },
          { value: 'Ellinor(4465)' },
          { value: 'Anton(984)' },
        ],
        pankaka: [
          { value: 'HeHe' },
          { value: '123' },
          { value: '4465' },
          { value: '984' },
          { value: '984' },
          { value: '984' },
          { value: '984' },
          { value: '984' },
          { value: '984' },
          { value: '984' },
          { value: '984' },
          { value: '984' },
          { value: '984' },
          { value: '984' },
          { value: '984' },
          { value: '984' },
          { value: '984' },
        ],
      });
    });

    table.parentReady();
  }, []);

  return (
    <StoryWrapper>
      <Table.Main
        withHeader
        useHistoryState
        historyStatePrefix="tickets"
        tableHook={table}
        displayCount
        autoFocus={boolean('Autofocus', true)}
        onAddRemove={(props) => action('props', props)}
        exportFileName={text('export file name', 'myexport.csv')}
        withSearch={boolean('With search', true)}
        parseSearchStringOutput={(query) => `${query} My special string`}
        parseFilterLabelOutput={(filter, filterKey) => {
          if (filterKey === 'guys') {
            const user = filter.match(/^(.+)\((\d+)\)/);
            if (user) {
              const [, newKey] = user;
              return newKey;
            }
          }

          return null;
        }}
        parseFilterKeyRequestOutput={(filterKey) => {
          if (filterKey === 'guys') {
            return 'BOSS';
          }
          return null;
        }}
        parseFilterItemRequestOutput={(filter, filterKey) => {
          if (filterKey === 'guys') {
            const user = filter.match(/\((\d+)\)/);

            if (user) {
              const [, newKey] = user;
              return newKey;
            }
          }
          return null;
        }}
        parseFilterRequestStringOutput={(filterString) => {
          if (filterString) {
            return `${filterString} and (entity_id eq '123')`;
          }
          return `(entity_id eq '123')`;
        }}
        withFilter={[
          {
            label: 'Guys', facetKey: 'guys', multiSelect: false, defaultSelect: 'Mike(1133)',
          },
          { label: 'Pankaka', facetKey: 'pankaka' },
        ]}
        withSort={[
          { value: 'created', label: 'Created' },
          {
            value: 'modified', label: 'Modified', default: true, direction: 'asc',
          },
          { value: 'closed', label: 'Closed' },
          { value: 'due', label: 'Due' },
        ]}
        headerData={[
          {
            label: lorem,
            size: 'minmax(30rem, 1fr)',
          },
          { label: 'B', key: 'test' },
          { label: 'C', sortKey: 'sort-C' },
          {
            label: 'D',
            size: 'minmax(8rem, 10rem)',
            props: { style: { textAlign: 'center' } },
          },
        ]}
        cardConfiguration={(row) => <Card row={row} />}
        columnConfiguration={(row) => {
          const {
            valueA, valueB, valueC, valueD,
          } = row;

          return [
            { value: valueB },
            valueA,
            () => valueC,
            () => ({ value: valueD, props: { style: { background: 'transparent' } } }),
          ];
        }}
      />
    </StoryWrapper>
  );
};

const myRes = Array.from(Array(10)).map((e, i) => (
  {
    name: `Name${i}`, age: Math.floor(Math.random() * 80 + 20),
  }));

export const mainSearchable = () => {
  const table = Table.useTableHook(() => ({ page_size: 15 }));

  const BG_FILTER_VALUE = 50;
  const BG_FILTER_KEY = 'age';

  // Fake response method that corresponds to the parseFilterRequestStringOutput-prop below
  const getFakeResponse = (search_string = '') => {
    const strippedString = search_string.replace(/\*/g, '').replace(/\+/g, ' ');

    const fakeFilteredResponse = myRes.filter((res) => {
      if (strippedString !== '') {
        return res[BG_FILTER_KEY] > BG_FILTER_VALUE
        && res.name.toLocaleLowerCase().includes(strippedString.toLocaleLowerCase());
      }
      return res[BG_FILTER_KEY] > BG_FILTER_VALUE;
    });

    const response = {
      result: fakeFilteredResponse,
      page: 1,
      total_pages: 1,
      total_count: fakeFilteredResponse,
      facets: {
        name: fakeFilteredResponse.map((el) => ({
          count: myRes.filter((res) => res.name === el.name).length,
          value: el.name,
        })),
      },
    };
    return response;
  };

  useEffect(() => {
    table.registerRowFetchCallback((payload, onSuccess) => {
      action('fetch')(payload);
      const { search_string } = payload;
      onSuccess(getFakeResponse(search_string));
    });

    table.registerFilterFetchCallback((payload, onSuccess) => {
      const { search_string } = payload;
      onSuccess(getFakeResponse(search_string).facets);
    });

    table.parentReady();
  }, []);

  return (
    <StoryWrapper>
      <p>{`Table with initial filter for age > 50`}</p>
      <Table.Controlls
        tableHook={table}
        searchLabel="search"
        withFilter={[{ label: 'Name', facetKey: 'name', excludeable: true }]}
        parseFilterRequestStringOutput={(filterString) => {
          if (filterString) {
            return `${filterString} and (${BG_FILTER_KEY} gt '${BG_FILTER_VALUE}'))`;
          }
          return `(${BG_FILTER_KEY} gt '${BG_FILTER_VALUE}')`;
        }}
      />

      <Table.Main
        withHeader
        useHistoryState
        displayCount={false}
        historyStatePrefix="tickets"
        tableHook={table}
        emptystate="Inga rez för"
        withControlls={false}
        exportFileName={text('export file name', 'export_file_name')}
        headerData={[
          {
            label: 'Name',
            size: 'minmax(30rem, 1fr)',
          },
          { label: 'Age', key: 'age' },

        ]}
        cardConfiguration={(row) => <Card row={row} />}
        columnConfiguration={(row) => {
          const {
            name, age,
          } = row;
          return [
            { value: name },
            { value: age },
          ];
        }}
      />
    </StoryWrapper>
  );
};

export const pagination = () => {
  const hook = Table.useTableHook();
  useEffect(() => {
    // registerRowFetchCallback => (payload, onSuccess, onFail)
    hook.registerRowFetchCallback((payload, onSuccess) => {
      onSuccess({ result: [...rowDummyData], page: 2, total_pages: 20 });
    });
    hook.parentReady();
  }, []);

  return (
    <StoryWrapper>
      <Table.Pagination tableHook={hook} />
    </StoryWrapper>
  );
};

export const sort = () => {
  const hook = Table.useTableHook();

  useEffect(() => {
    hook.registerRowFetchCallback((payload, onSuccess) => {
      onSuccess({ result: [...rowDummyData], page: 2, total_pages: 20 });
    });
    hook.parentReady();
  }, []);

  return (
    <StoryWrapper>
      <Table.Sort
        tableHook={hook}
        sortKeys={[
          { value: 'created', label: 'Created' },
          {
            value: 'modified', label: 'Modified', default: true, direction: 'asc',
          },
          { value: 'closed', label: 'Closed' },
          { value: 'due', label: 'Due' },
        ]}
      />
    </StoryWrapper>
  );
};

export const filter = () => {
  const hook = Table.useTableHook();

  useEffect(() => {
    hook.registerRowFetchCallback((payload, onSuccess) => {
      action('fetch')(payload);
      onSuccess({ });
    });
    hook.registerFilterFetchCallback((payload, onSuccess) => {
      onSuccess({
        guys: [
          { value: 'Mike(1133)', count: 32 },
          { value: 'Keen(123)', count: 4 },
          { value: 'Ellinor(4465)', count: 26 },
          { value: 'Anton(984)', count: 14 },
        ],
        pankaka: [
          { value: 'Mike(1133)', count: 32 },
          { value: 'Keen(123)', count: 4 },
          { value: 'Ellinor(4465)', count: 26 },
          { value: 'Anton(984)', count: 14 },
        ],
      });
    });
    hook.parentReady();
  }, []);

  return (
    <StoryWrapper>
      <Table.Filter
        tableHook={hook}
        filterKeys={[
          {
            label: 'guys',
            facetKey: 'guys',
            multiSelect: false,
            operator: 'custom_operator',
            defaultSelect: { value: 'Mike(1133)', count: 32 },
            onChange: (a) => {
              action('OnChange')(a);
            },
          },
          { label: 'Pankaka', facetKey: 'pankaka' },
        ]}
        parseFilterLabelOutput={(filters) => filters}
        parseFilterItemRequestOutput={(filters) => filters}
        parseFilterKeyRequestOutput={(filters) => filters}
      />
    </StoryWrapper>
  );
};

export const searchBar = () => {
  const hook = Table.useTableHook();

  useEffect(() => {
    hook.registerRowFetchCallback((payload, onSuccess) => {
      onSuccess({ result: [...rowDummyData], page: 2, total_pages: 20 });
    });
    hook.parentReady();
  }, []);

  return (
    <StoryWrapper>
      <Table.SearchBar tableHook={hook} searchLabel="Search here" />
    </StoryWrapper>
  );
};

export const controlls = () => {
  const hook = Table.useTableHook();

  useEffect(() => {
    hook.registerRowFetchCallback((payload, onSuccess) => {
      onSuccess({
        result: [...rowDummyData], page: 2, total_pages: 20, total_count: 1000,
      });
    });

    hook.registerFilterFetchCallback((payload, onSuccess) => {
      onSuccess({
        gurka: Array.from({ length: 20 }, (_, i) => ({ value: i.toString() })),
        pankaka: [
          { value: '1133' },
          { value: '123' },
          { value: '4465' },
          { value: '984' },
        ],
      });
    });
    hook.parentReady();
  }, []);

  return (
    <StoryWrapper>
      <Table.Controlls
        tableHook={hook}
        withSearch={boolean('With search', true)}
        withFilter={[
          { label: 'Gurka', facetKey: 'gurka' },
          { label: 'Pankaka', facetKey: 'pankaka' },
        ]}
        withSort={[
          { value: 'created', label: 'Created' },
          {
            value: 'modified', label: 'Modified', default: true, direction: 'asc',
          },
          { value: 'closed', label: 'Closed' },
          { value: 'due', label: 'Due' },
        ]}
      />
    </StoryWrapper>
  );
};

export const separate = () => {
  const hook = Table.useTableHook();
  const [add, setAdd] = useState([]);
  const [renderAdd, setRenderAdd] = useState([]);

  useEffect(() => {
    setRenderAdd(new Set([...renderAdd, ...add]));
  }, [add]);

  const clicker = (row) => ({
    onClick: () => {
      setAdd([...add, row.id]);
    },
  });

  useEffect(() => {
    hook.registerRowFetchCallback((payload, onSuccess) => {
      action('fetch row')(payload);

      onSuccess({
        result: [...rowDummyData],
        page: 2,
        total_pages: 20,
        facets: {
          guys: [
            { value: 'Mike(1133)', count: 1 },
            { value: 'Keen(123)', count: 1 },
            { value: 'Ellinor(4465)', count: 1 },
            { value: 'Anton(984)', count: 1 },
          ],
          pankaka: [
            { value: 'HeHe', count: 1 },
            { value: '123', count: 1 },
            { value: '4465', count: 1 },
            { value: '984', count: 1 },
          ],
        },
      });
    });

    hook.registerFilterFetchCallback((payload, onSuccess) => {
      action('fetch facet')(payload);
      onSuccess({
        guys: [
          { value: 'Mike(1133)', count: 23 },
          { value: 'Keen(123)', count: 23 },
          { value: 'Ellinor(4465)', count: 23 },
          { value: 'Anton(984)', count: 23 },
        ],
        pankaka: [
          { value: 'HeHe', count: 23 },
          { value: '123', count: 23 },
          { value: '4465', count: 23 },
          { value: '984', count: 23 },
          { value: '', count: 23 },
        ],
      });
    });
    hook.parentReady();
  }, []);

  return (
    <StoryWrapper>
      <pre>
        <code>
          {Array.from(renderAdd).map((a) => `${a}\n`)}
        </code>
      </pre>
      <Table.Controlls
        tableHook={hook}
        withSearch={boolean('With search', true)}
        // parseFilterLabelOutput => (filter, filterKey)
        parseFilterLabelOutput={(tableFilter) => {
          if (tableFilter === '') {
            return 'Missing';
          }
          return null;
        }}
        withFilter={[
          { label: 'Guys', facetKey: 'guys' },
          { label: 'Pankaka', facetKey: 'pankaka' },
        ]}
        withSort={[
          { value: 'created', label: 'Created' },
          {
            value: 'modified', label: 'Modified', default: true, direction: 'asc',
          },
          { value: 'closed', label: 'Closed' },
          { value: 'due', label: 'Due' },
        ]}
      />
      <Table.Main
        withHeader
        useHistoryState
        withControlls={false}
        historyStatePrefix="tickets"
        tableHook={hook}
        clickRowConfigutation={(row) => clicker(row)}
        headerData={[
          {
            label: lorem,
            size: 'minmax(30rem, 1fr)',
          },
          { label: 'B', key: 'test' },
          { label: 'C', sortKey: 'sort-C' },
          {
            label: 'D',
            size: 'minmax(8rem, 10rem)',
            props: { style: { textAlign: 'center' } },
          },
        ]}
        columnConfiguration={(row) => {
          const {
            valueA, valueB, valueC, valueD,
          } = row;

          return [
            { value: valueB },
            valueA,
            () => valueC,
            () => ({ value: valueD, props: { style: { background: 'transparent' } } }),
          ];
        }}
      />
      <Table.Pagination tableHook={hook} />
    </StoryWrapper>
  );
};