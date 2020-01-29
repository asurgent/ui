import React from 'react';
import PropTypes from 'prop-types';
import IconAsurget from '../../icons/IconAsurget';
import CurrentUser from '../CurrentUser';
import DropdownMenu from '../DropdownMenu';
import * as C from './MainLayout.styled';
import Navigation from '../Navigation';

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
  const selectedLanguage = provider.getCurrentLanguage();
  const { name, email, imageLink } = provider.getUser();

  return (
    <C.Main>
      <C.Logo>
        <IconAsurget />
      </C.Logo>

      <C.Top>
        <CurrentUser name={name} email={email} imageLink={imageLink}>
          {({ onClose }) => (
            <DropdownMenu
              onNavigate={onClose}
              onChangeLanguage={provider.onChangeLanguage}
              onLogout={provider.onLogout}
              languages={languages}
              navigationList={navigation}
              selectedLanguage={selectedLanguage}
              translations={provider.getMenuTranslations()}
              name={name}
              email={email}
              imageLink={imageLink}
              onClose={onClose}
            />
          )}
        </CurrentUser>
      </C.Top>

      <C.Left>
        <Navigation
          theme={(theme) => ({
            activeBackground: theme.blue800,
            activeLinkColor: theme.white,
            linkColor: theme.white,
          })}
          navigationList={navigation}
        />
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
