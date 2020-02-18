import React, { useEffect } from 'react';
import {
  withKnobs, boolean, text, number,
} from '@storybook/addon-knobs';
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
      clickRowConfigutation={(row) => ({ link: '/', onClick: () => { console.log(`Click row: ${row.id}`); } })}
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
  const table = Table.useTableHook();

  useEffect(() => {
    table.setPageSize(15);
    table.registerRowFetchCallback((payload, onSuccess, onFail) => {
      console.log('fetch', payload);

      if (success) {
        onSuccess({ result: [...rowDummyData], page: 2, total_pages: 20 });
      } else {
        onFail('Could not get your things');
      }
    });

    table.registerFilterFetchCallback((payload, onSuccess, onFail) => {
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
        withSearch={boolean('With search', true)}
        parseFilterLabelOutput={(filter, filterKey) => {
          if (filterKey === 'guys') {
            const user = filter.match(/^(.+)\((\d+)\)/);
            if (user) {
              const [_, newKey] = user;
              return newKey;
            }
          }

          return null;
        }}
        parseFilterRequestOutput={(filter, filterKey) => {
          if (filterKey === 'guys') {
            const user = filter.match(/\((\d+)\)/);

            if (user) {
              const [_, newKey] = user;
              return newKey;
            }
          }

          // return rest;
          return null;
        }}
        withFilter={[
          { label: 'Guys', facetKey: 'guys', excludeable: true },
          { label: 'Pankaka', facetKey: 'pankaka', excludeable: false },
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
    hook.registerRowFetchCallback((payload, onSuccess, onFail) => {
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
    hook.registerRowFetchCallback((payload, onSuccess, onFail) => {
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
    hook.registerRowFetchCallback((payload, onSuccess, onFail) => {
      console.log('fetch', payload);
      onSuccess({ });
    });
    hook.registerFilterFetchCallback((payload, onSuccess, onFail) => {
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
    hook.parentReady();
  }, []);

  return (
    <StoryWrapper>
      <Table.Filter
        tableHook={hook}
        filterKeys={[
          { label: 'guys', facetKey: 'guys', excludeable: true },
          { label: 'Pankaka', facetKey: 'pankaka', excludeable: false },
        ]}
        parseFilterLabelOutput={(filters) => filters}
        parseFilterRequestOutput={(filters) => filters}
      />
    </StoryWrapper>
  );
};

export const searchBar = () => {
  const hook = Table.useTableHook();

  useEffect(() => {
    hook.registerRowFetchCallback((payload, onSuccess, onFail) => {
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
    hook.registerRowFetchCallback((payload, onSuccess, onFail) => {
      onSuccess({ result: [...rowDummyData], page: 2, total_pages: 20 });
    });

    hook.registerFilterFetchCallback((payload, onSuccess, onFail) => {
      onSuccess({
        gurka: [
          { value: '1133' },
          { value: '123' },
          { value: '4465' },
          { value: '984' },
        ],
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
          { label: 'Gurka', facetKey: 'gurka', excludeable: true },
          { label: 'Pankaka', facetKey: 'pankaka', excludeable: false },
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

  useEffect(() => {
    hook.registerRowFetchCallback((payload, onSuccess, onFail) => {
      console.log('fetch', payload);

      onSuccess({ result: [...rowDummyData], page: 2, total_pages: 20 });
    });
    hook.registerFilterFetchCallback((payload, onSuccess, onFail) => {
      onSuccess({
        gurka: [
          { value: '1133' },
          { value: '123' },
          { value: '4465' },
          { value: '984' },
        ],
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
          { label: 'Gurka', facetKey: 'gurka', excludeable: true },
          { label: 'Pankaka', facetKey: 'pankaka', excludeable: false },
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
        historyStatePrefix="tickets"
        tableHook={hook}
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
