import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as C from './Table.styled';
import { generateRows, generateHeaders } from './helpers';

const propTypes = {
  renderHeaders: PropTypes.bool,
  rowData: PropTypes.arrayOf(
    PropTypes.instanceOf(Object),
  ).isRequired,
  headerData: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      sortKey: PropTypes.string,
    }),
  ),
  rowConfiguration: PropTypes.func.isRequired,
};

const defaultProps = {
  renderHeaders: true,
  headerData: [],
};

const bodyComponents = { row: C.Row, cell: C.Cell };
const headerComponents = { row: C.HeaderRow, cell: C.Header };

const Table = (props) => {
  const { rowData, headerData, rowConfiguration } = props;
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    const defaultRows = generateRows(rowData, headerData, rowConfiguration, bodyComponents);
    const defaultHeaders = generateHeaders(headerData, headerComponents);
    setRows(defaultRows);
    setHeaders(defaultHeaders);
  }, []);

  const { renderHeaders } = props;
  return (

    <C.Base>
      <C.Content>
        { renderHeaders && headers }
        { rows }
      </C.Content>
    </C.Base>
  );
};

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default Table;
