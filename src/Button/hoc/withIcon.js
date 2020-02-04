import React from 'react';
import PropTypes from 'prop-types';
import * as Styles from '../Button.styled';
import withButtonStyle from './withButtonStyle';


const withButtonIcon = ({ icon: Icon }) => {
  const Button = withButtonStyle({ style: Styles.Icon });

  const IconButton = ({ fontSize, ...props }) => (
    <Button mainIcon={<Icon fontSize={fontSize} />} {...props} />
  );

  return IconButton;
};

export default withButtonIcon;
