import React from 'react';

export const generateHeaders = (headerData, components) => {
  const HeaderRow = components.row;
  const HeaderCell = components.cell;

  const headers = headerData.reduce((acc, header) => {
    const { value } = header;
    acc.push(<HeaderCell key={value}>{value}</HeaderCell>);
    return acc;
  }, []);

  return <HeaderRow>{headers}</HeaderRow>;
};

const generateCells = (rowConfiguration, rowData, headerData, CellComponent) => rowConfiguration(rowData)
  .reduce((cellAcc, cell, cellIndex) => {
    const headerProps = headerData[cellIndex] ? headerData[cellIndex].props : {};
    const id = `${rowData.id}-cell-${cellIndex}`;

    if (typeof cell === 'function') {
      const cellFnData = cell();

      // If an object is returned, look if the value attr exists
      // Also pass potential props attr
      if (typeof cellFnData === 'object' && Object.prototype.hasOwnProperty.call(cellFnData, 'value')) {
        // const overrideProps = { ...(cellFnData.props || {}), ...headerProps };
        const overrideProps = { ...headerProps };
        cellAcc.push({ cell: cellFnData.value, id, props: overrideProps });
      } else {
        cellAcc.push({ cell: cellFnData, id, props: headerProps });
      }
    } else if (typeof cell === 'object') {
      if (Object.prototype.hasOwnProperty.call(cell, 'value')) {
        // const overrideProps = { ...(cell.props || {}), ...headerProps };
        const overrideProps = { ...headerProps };
        cellAcc.push({ cell: cell.value, id, props: overrideProps });
      } else {
        cellAcc.push({ cell: '', id, props: headerProps });
      }
    } else {
      cellAcc.push({ cell, id, props: headerProps });
    }

    return cellAcc;
  }, [])
  .map(({ id, props, cell }) => <CellComponent {...props} key={id}>{cell}</CellComponent>);

export const generateRows = (rowData, headerData, rowConfiguration, components) => {
  const rows = rowData.reduce((acc, cellData, index) => {
    if (!cellData.id) {
      const id = `row-id-${new Date().getTime()}-${index}`;
      Object.assign(cellData, { id });
    }

    const CellComponent = components.cell;
    const RowComponent = components.row;
    // Generate cells
    const cells = generateCells(rowConfiguration, cellData, headerData, CellComponent);

    // Add new row with the cells as it's children
    acc.push(<RowComponent {...(cellData.props || {})} key={cellData.id}>{cells}</RowComponent>);

    return acc;
  }, []);

  return rows;
};
