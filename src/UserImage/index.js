import React from 'react';
import PropTypes from 'prop-types';
import UserPhoto from './UserPhoto';

const propTypes = {
  square: PropTypes.bool,
};

const defaultProps = {
  square: true,
};

const Square = ({ square, ...props }) => <UserPhoto square {...props} />;

Square.propTypes = propTypes;
Square.defaultProps = defaultProps;

export { UserPhoto as Circle };
export { Square };
