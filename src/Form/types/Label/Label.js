import React from 'react';
import PropTypes from 'prop-types';
import * as C from './Label.styled';

const propTyps = {
  value: PropTypes.string,
};

const defaultProps = {
  value: '',
};

const Label = ({ value }) => <C.Label>{value}</C.Label>;

Label.defaultProps = defaultProps;
Label.propTypes = propTyps;

export default Label;
