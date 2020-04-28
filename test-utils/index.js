import React from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import theme from '../lib/style/theme';

const propTypes = {
  children: PropTypes.instanceOf(Object),
};

const defaultProps = {
  children: null,
};

const Providers = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </BrowserRouter>
);

Providers.propTypes = propTypes;
Providers.defaultProps = defaultProps;

const customRender = (ui, options) => render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
