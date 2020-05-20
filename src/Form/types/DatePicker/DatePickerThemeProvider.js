import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const propTypes = {
  children: PropTypes.instanceOf(Object),
};

const defaultProps = {
  children: null,
};

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#44ADE1',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});


const CustomThemeProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

CustomThemeProvider.propTypes = propTypes;
CustomThemeProvider.defaultProps = defaultProps;
export default CustomThemeProvider;
