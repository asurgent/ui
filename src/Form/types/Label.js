import React from 'react';
import PropTypes from 'prop-types';

const propTyps = {
  value: PropTypes.string,
};

const defaultProps = {
  value: '',
};

const Label = ({ value }) => <>{value}</>;

Label.defaultProps = defaultProps;
Label.propTypes = propTyps;
Label.displayName = '@asurgent.ui.Form.Label';

export default Label;
