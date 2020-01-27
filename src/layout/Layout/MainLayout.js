
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Button from '../../Button';
import * as Tooltip from '../../Tooltip';
import IconAsurget from '../../icons/IconAsurget';
import UserDropdown from '../UserDropdown';
import * as C from './MainLayout.styled';

const propTypes = {
  provider: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

const defaultProps = {};

const Layout = ({ provider, children }) => {
  const navigation = provider.getNavigationItems();
  const languages = provider.getAvaliableLanguages();
  const { name, email } = provider.getUser();

  return (
    <C.Main>
      <C.Logo>
        <IconAsurget />
      </C.Logo>

      <C.Top>
        <UserDropdown
          languages={languages}
          name={name}
          email={email}
        />
      </C.Top>

      <C.Left>
        {
            navigation.map(({ icon, label, link }) => (
              <Tooltip.Right tip={label} key={label}>
                <C.NavigationItem>
                  <Button.Plain link={link}>
                    {icon}
                  </Button.Plain>
                </C.NavigationItem>
              </Tooltip.Right>
            ))
        }
      </C.Left>

      <C.Content>
        {children}
      </C.Content>
    </C.Main>
  );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;
Layout.displayName = '@asurgent.ui.Layout.Main';

export default Layout;
