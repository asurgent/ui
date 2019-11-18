import React from 'react';
import PropTypes from 'prop-types';
import * as Style from './CallbackTable.styled';

const CallbackTable = ({ children }) => (
  <Style.Main>
    {children}
  </Style.Main>
);

CallbackTable.propTypes = {
  children: PropTypes.any,
};

export default CallbackTable;
