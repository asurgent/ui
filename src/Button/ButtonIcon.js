import React from 'react';
import PropTypes from 'prop-types';
import withButtonStyle from './hoc/withButtonStyle';
import * as Styles from './Button.styled';

const propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

const ButtonIcon = ({ icon, ...props }) => {
  const Button = withButtonStyle({ style: Styles.Icon });

  return (
    <Button mainIcon={icon} {...props} />
  );
};

ButtonIcon.propTypes = propTypes;
ButtonIcon.propTypes = propTypes;
ButtonIcon.displayName = '@asurgent.ui.Button.Icon';

export default ButtonIcon;
