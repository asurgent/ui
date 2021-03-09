import React from 'react';

import { ThemeProvider } from 'styled-components';
import Normalize from '../lib/style/Normalize.styled';
import theme from '../lib/style/theme'

export const decorators = [
  (Story) => (
    <>
      <Normalize />
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" }
}