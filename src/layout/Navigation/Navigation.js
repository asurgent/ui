import React from 'react';
import { ThemeProvider } from 'styled-components';
import * as C from './Navigation.styled';
import * as Tooltip from '../../Tooltip';
import * as Button from '../../Button';

const mergeThemes = (theme) => (originTheme) => {
  const newTheme = theme(originTheme);

  return { ...originTheme, ...newTheme };
};

const Navigation = ({
  theme,
  withLabel,
  navigationList,
}) => (
  <ThemeProvider theme={mergeThemes(theme)}>
    <C.Wrapper>
      {
            navigationList.map(({
              icon, tooltip, link, active, label,
            }) => (
              <Tooltip.Right tip={tooltip} key={tooltip}>
                <C.NavigationItem active={active}>
                  <Button.Plain link={link}>
                    {icon}
                    {' '}
                    {withLabel && (<span>{label}</span>)}
                  </Button.Plain>
                </C.NavigationItem>
              </Tooltip.Right>
            ))
        }
    </C.Wrapper>
  </ThemeProvider>
);

export default Navigation;
