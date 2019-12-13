import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import styled from 'styled-components';
import { sortDirection, Primary as Table } from './index';

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

export const defaultTable = () => (
  <Table
    onSort={(key, direction) => { console.log(key, direction); }}
    onPagination={(requestedPage) => { console.log(requestedPage); }}
    sortDirection={sortDirection.asc}
    activeSort="sort-A"
    activePage={10}
    pages={10}
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
        // props: { style: { background: 'magenta' } },
      },
      { value: 'B', sortKey: 'sort-B' },
      { value: 'C', sortKey: 'sort-C' },
      {
        value: 'D',
        sortKey: 'sort-D',
        size: 'minmax(8rem, 10rem)',
        // props: { style: { color: 'magenta' } },
      },
    ]}
    rowData={[
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
        // props: { style: { background: 'pink' } },
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
