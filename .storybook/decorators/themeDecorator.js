import React from "react"
import theme from './../../lib/style/theme'
import Normalize from './../../lib/style/Normalize.styled'
import { ThemeProvider } from "styled-components"

const ThemeDecorator = storyFn => (
  <>
    <Normalize/>
    <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
  </>
)

export default ThemeDecorator