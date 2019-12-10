import React from 'react';

const isObject = (item) => (item && typeof item === 'object' && !Array.isArray(item));

const mergeDeep = (target, source) => {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = mergeDeep(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
};

const tableColumnGenerator = (columnConfiguration, cellData, headerData) => {
  const columnList = columnConfiguration(cellData);

  // Make sure the cell-size lenght match with number of
  // headers since the headers controll the grid sizing
  return Array
    .from({ length: headerData.length })
    .map((_, i) => ({
      isEvenColumn: ((i + 1) % 2) === 1,
      data: (columnList[i] || ''),
    }));
};

const extendCellObject = (index, cellData, newCell, headerData, rowData) => {
  const headerProps = headerData[index] ? headerData[index].props : {};
  const rowProps = rowData.props || {};
  const cellProps = (cellData.props || {});

  // Merge all passed props from header, row & cell
  // Priority is cell, row, header
  const baseProps = mergeDeep(rowProps, headerProps);
  const overrideProps = mergeDeep(baseProps, cellProps);

  // Try to figure out what's beeing passed and render accordingly
  if (typeof cellData === 'object' && Object.prototype.hasOwnProperty.call(cellData, 'value')) {
    Object.assign(newCell, { cell: cellData.value, props: overrideProps });
  } else if (typeof cellData === 'string') {
    Object.assign(newCell, { cell: cellData, props: overrideProps });
  } else if (React.isValidElement(cellData)) {
    Object.assign(newCell, { cell: cellData, props: overrideProps });
  } else {
    // If we don't match, still append an empty cell
    // so we get an even cell count for the row
    Object.assign(newCell, { cell: '', props: overrideProps });
  }
};

const tableRowCellGenerator = (columnList, rowData, headerData) => columnList
  .reduce((cellAcc, { isEvenColumn, data: cell }, cellIndex) => {
    const id = `${rowData.id}-cell-${cellIndex}`;
    const newCell = { isEvenColumn, id };

    if (typeof cell === 'function') {
      const cellFnData = cell();
      extendCellObject(cellIndex, cellFnData, newCell, headerData, rowData);
    } else {
      extendCellObject(cellIndex, cell, newCell, headerData, rowData);
    }

    cellAcc.push(newCell);
    return cellAcc;
  }, []);

const generateCells = (props, rowData, isEvenRow, components) => {
  const { columnConfiguration, headerData } = props;

  const Cell = components.cell;
  const CellContent = components.content;

  const columnList = tableColumnGenerator(columnConfiguration, rowData, headerData);
  const cellsList = tableRowCellGenerator(columnList, rowData, headerData);

  return cellsList
    .map((cellData) => {
      const {
        id,
        cell,
        isEvenColumn,
        props: cellProps,
      } = cellData;

      const classes = [
        (isEvenRow ? 'odd-row' : 'even-row'),
        (isEvenColumn ? 'odd-column' : 'even-column'),
      ].join(' ');

      return (
        <Cell {...cellProps} key={id} className={classes}>
          <CellContent>
            {cell}
          </CellContent>
        </Cell>
      );
    });
};

const generateCard = (props, columnData, isEvenRow, components) => {
  const { cardConfiguration } = props;
  const content = cardConfiguration(columnData, isEvenRow);
  const CellComponent = components.cell;

  const element = (
    <CellComponent key={`${columnData.id}-card`} cardView isEvenRow>
      {content}
    </CellComponent>
  );

  return element;
};

const generateRowId = (columnData, index) => {
  if (!columnData.id) {
    const id = `row-id-${new Date().getTime()}-${index}`;
    Object.assign(columnData, { id });
  }
};

export const generateRows = (props, components) => props.rowData
  .reduce((acc, rowData, index) => {
    generateRowId(rowData, index);
    const { cardView } = props;
    const isEvenRow = (index - 1) % 2;

    if (cardView && typeof props.cardConfiguration === 'function') {
      const card = generateCard(props, rowData, isEvenRow, components);
      acc.push(card);
    } else {
      const cells = generateCells(props, rowData, isEvenRow, components);
      acc.push(cells);
    }

    return acc;
  }, []);
