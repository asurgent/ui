import React from 'react';
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
    const result = ({ ...override, ...libraryTheme });

    return result;
  };

  const mergePropsTheme = (propsTheme) => (t) => {
    const override = typeof propsTheme === 'function' ? propsTheme(t) : themeOverrides;
    const result = ({ ...override, ...libraryTheme });

    return result;
  };

  const WithTheme = ({ theme, ...props }) => (
    <ThemeProvider theme={theme ? mergePropsTheme(theme) : generateTheme}>
      <Target {...props} />
    </ThemeProvider>
  );

  WithTheme.propTypes = propTypes;
  WithTheme.defaultProps = defaultProps;

  return WithTheme;
};

export default withTheme;
