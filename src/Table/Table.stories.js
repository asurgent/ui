
import React from 'react';
import Table, { sortDirection } from './index';

export default { title: 'UI Components|Table' };

const longParagraph = 'ThereThereThereThereThereThereThereThereThereThereThereThere';
export const defaultTable = () => (
  <Table
    headerData={[
      {
        value: 'A', sortKey: 'sort-A', direction: sortDirection.asc, props: { style: { width: '30rem' } },
      },
      { value: 'B', sortKey: 'sort-B' },
      { value: 'C', sortKey: 'sort-C' },
      { value: 'D', sortKey: 'sort-D' },
    ]}
    rowData={[
      {
        valueA: 'Hello', valueB: longParagraph, valueC: 'Im', valueD: 'A Row',
      },
      {
        valueA: 'Hello', valueB: 'There', valueC: 'Im', valueD: 'A Row', props: { style: { background: 'pink' } },
      },
    ]}
    rowConfiguration={(row) => {
      const {
        valueA, valueB, valueC, valueD,
      } = row;

      return [
        valueA,
        { value: (<p>{valueB}</p>), props: { style: { background: 'orange' } } },
        () => valueC,
        () => ({ value: valueD, props: { style: { background: 'Magenta' } } }),
      ];
    }}
  />
);
