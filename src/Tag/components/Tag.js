import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
};

const Tag = ({ label, component: Styled }) => <Styled>{label}</Styled>;

Tag.propTypes = propTypes;
export default Tag;
