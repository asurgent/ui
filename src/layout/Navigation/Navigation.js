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
  onNavigate,
}) => (
  <ThemeProvider theme={mergeThemes(theme)}>
    <C.Wrapper>
      {
            navigationList.map(({
              icon, tooltip, link, label,
            }) => (
              <Tooltip.Right tip={tooltip} key={tooltip}>
                <C.NavigationItem to={link} onClick={onNavigate}>
                  {icon}
                  {' '}
                  {withLabel && (<span>{label}</span>)}
                </C.NavigationItem>
              </Tooltip.Right>
            ))
        }
    </C.Wrapper>
  </ThemeProvider>
);

export default Navigation;
