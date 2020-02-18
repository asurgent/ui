import React from 'react';
import PropTypes from 'prop-types';
import * as C from './TableHeader.styled';

const propTypes = {
  headerData: PropTypes.instanceOf(Array).isRequired,
  equalSizeColumns: PropTypes.bool,
};

const defaultProps = {
  equalSizeColumns: false,
};

const TableHeader = ({
  headerData,
  equalSizeColumns,
}) => (
  <C.HeaderRow headerList={headerData} equalSize={equalSizeColumns} striped>
    { headerData.map(({ value, render = true, props: headerProps }) => (
      render && (
        <C.Header {...(headerProps || {})} key={value}>
          <C.HeaderLabel>{value}</C.HeaderLabel>
        </C.Header>
      )
    )) }
  </C.HeaderRow>
);

TableHeader.propTypes = propTypes;
TableHeader.defaultProps = defaultProps;
TableHeader.displayName = '@asurgent.ui.Table.TableHeader';

export default TableHeader;
