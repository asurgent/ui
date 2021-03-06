import React from 'react';
import * as Button from '../../Button';

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

const extendCellObject = (index, cellData, newCell, headerData, rowData) => {
  let renderCell;
  if (headerData[index]) {
    if (Object.prototype.hasOwnProperty.call(headerData[index], 'render')) {
      renderCell = headerData[index].render;
    } else {
      renderCell = true;
    }
  } else {
    renderCell = true;
  }
  const headerProps = headerData[index] ? headerData[index].props : {};
  const rowProps = rowData.props || {};
  const cellProps = (cellData.props || {});
  Object.assign(newCell, { render: renderCell });

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
  .reduce((cellAcc, cell, cellIndex) => {
    const id = `${rowData.id}-cell-${cellIndex}`;
    const newCell = { id };

    if (typeof cell === 'function') {
      const cellFnData = cell();
      extendCellObject(cellIndex, cellFnData, newCell, headerData, rowData);
    } else {
      extendCellObject(cellIndex, cell, newCell, headerData, rowData);
    }

    cellAcc.push(newCell);

    return cellAcc;
  }, []);

const generateCells = (props, rowData, components) => {
  const { columnConfiguration, headerData } = props;

  // Make it possible to override default styling of cells
  const Cell = props.cellComponent ? props.cellComponent(components) : components.cell;
  const CellContent = components.content;

  const columnList = columnConfiguration(rowData);
  const cellsList = tableRowCellGenerator(columnList, rowData, headerData);

  return cellsList
    .map((cellData, i) => {
      const {
        id,
        cell,
        render,
        props: cellProps,
      } = cellData;

      if (!render) {
        return null;
      }

      return (
        <Cell {...cellProps} key={id} className={`column-${i + 1}`}>
          <CellContent>
            {cell}
          </CellContent>
        </Cell>
      );
    });
};

const generateRowId = (columnData, index) => {
  if (!columnData.id) {
    const id = `row-id-${new Date().getTime()}-${index}`;
    Object.assign(columnData, { id });
  }
};

const generateCard = (props, cardData, components, handleSelect, onAddRemove) => {
  const { cardConfiguration, cardComponent } = props;

  const content = cardConfiguration(cardData);
  const { props: cardProps } = content;

  const CardContainer = cardComponent ? cardComponent(components, cardData) : components.card;

  const element = (
    handleSelect && onAddRemove ? (
      <CardContainer {...cardProps} key={`${cardData.id}-card`} cardView onClick={() => handleSelect(cardData)} onSelect={onAddRemove}>
        {content}
      </CardContainer>
    ) : (
      <CardContainer {...cardProps} key={`${cardData.id}-card`} cardView>
        {content}
      </CardContainer>
    )
  );
  return element;
};

const generateRows = (props, components, handleSelect, onAddRemove) => props.rowData
  .reduce((acc, rowData, index) => {
    generateRowId(rowData, index);
    const { cardView } = props;

    if (cardView && typeof props.cardConfiguration === 'function') {
      const card = generateCard(props, rowData, components, handleSelect, onAddRemove);
      acc.push(card);
    } else {
      // Make it possible to override default styling of rows
      const Row = props.rowComponent ? props.rowComponent(components, rowData) : components.row;
      const row = (
        <Row
          key={rowData.id}
          headerList={props.headerData}
          striped={props.striped}
          zebra={props.zebra}
          equalSize={props.equalSizeColumns}
          onSelect={handleSelect}
          onClick={() => handleSelect(rowData)}
        >
          {generateCells(props, rowData, components)}
        </Row>
      );

      if (props.clickRowConfigutation) {
        const clickRow = props.clickRowConfigutation(rowData);
        if (typeof clickRow === 'object') {
          const {
            link,
            onClick,
            clearStateKeys = [],
          } = clickRow;

          const linkRow = (
            <Button.Plain
              key={rowData.id}
              clearStateKeys={clearStateKeys}
              link={link}
              onClick={onClick}
            >
              {row}
            </Button.Plain>
          );
          acc.push(linkRow);
        } else {
          acc.push(row);
        }
      } else {
        acc.push(row);
      }
    }

    return acc;
  }, []);

export default generateRows;
