import React, { useEffect } from 'react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
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

const rowDummyData = [
  {
    valueA: lorem,
    valueB: lorem,
    valueC: 'Im',
    valueD: 'A Row',
  },
  {
    valueA: lorem,
    valueB: 'There',
    valueC: 'Im',
    valueD: 'A Row',
  },
];

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
    pages={10}
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
    columnConfiguration={(row) => {
      const {
        valueA, valueB, valueC, valueD,
      } = row;

      return [
        { value: valueB },
        valueA,
        () => valueC,
        () => ({ value: valueD, props: { style: { background: 'transaprent' } } }),
        () => ({ value: 'IM AM HIDDEN' }),
      ];
    }}
  />
);

export const apiTable = () => {
  const success = boolean('Successful response', true);
  const updateCallbackFunction = (page, query, provider) => {
    // do ajaxrequest based on page & query
    // use setter to set responsedata from azure-search api

    if (success) {
      provider.setSuccessResponse({ result: [...rowDummyData], page: 1, total_pages: 0 });
    } else {
      provider.setFailedResponse('Could not get your things');
    }
  };

  const table = Table.useTableProvider((page, query) => {
    updateCallbackFunction(page, query, table);
  });

  useEffect(() => {
    table.parentReady();
  }, []);

  return (
    <Table.Api
      provider={table}
      withSearch={boolean('With search', true)}
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
          () => ({ value: valueD, props: { style: { background: 'transaprent' } } }),
        ];
      }}
    />
  );
};
