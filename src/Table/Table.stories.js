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
        exportFileName={text('export file name', 'export_file_name')}
        withSearch={boolean('With search', true)}
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
        guys: [{ value: '1' },
          ...Array.from({ length: 100 }, (_, i) => ({
            value: `Item ${i}`,
          }))],
        pankaka: [
          { value: 'HeHe' },
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
      <Table.Filter
        tableHook={hook}
        filterKeys={[
          {
            label: 'guys', facetKey: 'guys', multiSelect: false, defaultSelect: 1,
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
        gurka: Array.from({ length: 20 }, (_, i) => ({ value: i })),
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
