import React from 'react';
import wrapDisplayName from 'recompose/wrapDisplayName';
import { ThemeProvider } from 'styled-components';
import libraryTheme from '../lib/style/theme';

const withTheme = (themeOverrides = {}) => (Target) => {
  const theme = (t) => {
    const override = typeof themeOverrides === 'function' ? themeOverrides(t) : themeOverrides;
    return ({ ...override, ...libraryTheme });
  };

  const WithTheme = (props) => (
    <ThemeProvider theme={theme}>
      <Target {...props} />
    </ThemeProvider>
  );

  // WithTheme.displayName = wrapDisplayName(Target, 'withTheme');

  return WithTheme;
};

export default withTheme;
