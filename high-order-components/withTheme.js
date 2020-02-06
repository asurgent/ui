import React from 'react';
import wrapDisplayName from 'recompose/wrapDisplayName';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import libraryTheme from '../lib/style/theme';

const propTypes = {
  theme: PropTypes.instanceOf(Object),
};

const defaultProps = {
  theme: null,
};

const withTheme = (themeOverrides = {}) => (Target) => {
  const generateTheme = (t) => {
    const override = typeof themeOverrides === 'function' ? themeOverrides(t) : themeOverrides;
    return ({ ...override, ...libraryTheme });
  };

  const WithTheme = ({ theme, ...props }) => (
    <ThemeProvider theme={theme || generateTheme}>
      <Target {...props} />
    </ThemeProvider>
  );


  WithTheme.propTypes = propTypes;
  WithTheme.defaultProps = defaultProps;
  WithTheme.displayName = wrapDisplayName(Target, 'withTheme');

  return WithTheme;
};

export default withTheme;
