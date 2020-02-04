import React, { useEffect } from 'react';
import {
  withKnobs, boolean, text, number,
} from '@storybook/addon-knobs';
import styled from 'styled-components';
import * as Table from './index';

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

export const defaultTable = () => (
  <Table.Primary
    onSort={(key, direction) => { console.log(key, direction); }}
    onPagination={(requestedPage) => { console.log(requestedPage); }}
    sortDirection={Table.sortDirection.asc}
    activeSort="sort-A"
    activePage={10}
    pages={number('Pages', 10)}
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
        value: lorem,
        sortKey: 'sort-A',
        size: 'minmax(30rem, 1fr)',
      },
      { value: 'B' },
      { value: 'C', sortKey: 'sort-C' },
      {
        value: 'D',
        sortKey: 'sort-D',
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
);

export const apiTable = () => {
  const success = boolean('Successful response', true);
  const updateCallbackFunction = (payload, provider) => {
    // do ajaxrequest based on page & query
    // use setter to set responsedata from azure-search api
    console.log(payload);

    if (success) {
      provider.setSuccessResponse({ result: [...rowDummyData], page: 2, total_pages: 2 });
    } else {
      provider.setFailedResponse('Could not get your things');
    }
  };

  const table = Table.useTableProvider((payload) => {
    updateCallbackFunction(payload, table);
  });

  useEffect(() => {
    // All user interfaces to interact with table provider
    table.setFilter('Tests');
    table.setFacets(['id']);
    // table.setOrderBy(['gurka desc']);
    // table.setSearchFields(['index_column']);
    // table.setSearchQuery('Default search query');
    // table.setPageNumber(2);

    table.parentReady();
  }, []);

  return (
    <Table.Api
      useHistoryState
      historyStatePrefix="tickets"
      provider={table}
      withSearch={boolean('With search', true)}
      sortKeys={[
        { value: 'created', label: 'Created' },
        {
          value: 'modified', label: 'Modified', default: true, direction: 123,
        },
        { value: 'closed', label: 'Closed' },
        { value: 'due', label: 'Due' },
      ]}
      headerData={[
        {
          value: lorem,
          sortKey: 'sort-A',
          size: 'minmax(30rem, 1fr)',
        },
        { value: 'B', sortKey: 'sort-B' },
        { value: 'C', sortKey: 'sort-C' },
        {
          value: 'D',
          sortKey: 'sort-D',
          size: 'minmax(8rem, 10rem)',
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
  );
};

export const pagination = () => (
  <Table.Pagination
    isLoading={boolean('isLoading', false)}
    onPagination={(page) => console.log(`requested page: ${page}`)}
    activePage={number('active page', 1)}
    pages={number('total pages', 10)}
  />
);

export const searchBar = () => {
  const table = Table.useTableProvider((payload) => {
    console.log(payload);
  });

  useEffect(() => {
    table.setSortKeys([
      { value: 'created', label: 'Created' },
      {
        value: 'modified', label: 'Modified', default: true, direction: 123,
      },
      { value: 'closed', label: 'Closed' },
      { value: 'due', label: 'Due' },
    ]);
    table.parentReady();
  }, []);

  return (
    <div style={{ background: 'pink', width: '100%' }}>
      <Table.SearchBar
        provider={table}
        searchLabel="Search here"
      />
    </div>
  );
};
