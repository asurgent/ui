import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Icons from '@material-ui/icons';
import IconAsurget from '../../icons/IconAsurget';
import CurrentUser from '../CurrentUser';
import DropdownMenu from '../DropdownMenu';
import DropdownCreate from '../DropdownCreate';
import * as Button from '../../Button';
import * as C from './Layout.styled';
import Navigation from '../Navigation';

const propTypes = {
  provider: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

const defaultProps = {};

const createListPropTypes = {
  shouldShow: PropTypes.bool,
  createList: PropTypes.instanceOf(Array),
  translations: PropTypes.instanceOf(Object),
};

const createListDefaultProps = {
  shouldShow: true,
  createList: [],
  translations: null,
};

const CreateList = ({ shouldShow, createList, translations }) => {
  const [createOpen, setCreateOpen] = useState(false);

  if (!shouldShow) {
    return null;
  }
  return (
    <>
      <Button.Create
        onClick={() => setCreateOpen(true)}
        iconRight={createOpen ? <Icons.ExpandLess /> : <Icons.ExpandMore />}
      >
        {translations.create}
      </Button.Create>
      <DropdownCreate
        onClose={() => setCreateOpen(false)}
        isOpen={createOpen}
        createActionList={createList}
      />
    </>
  );
};

CreateList.propTypes = createListPropTypes;
CreateList.defaultProps = createListDefaultProps;

const Layout = ({ provider, children }) => {
  const navigation = provider.getNavigationItems();
  const languages = provider.getAvaliableLanguages();
  const selectedLanguage = provider.getCurrentLanguage();
  const {
    name, email, imageLink, isAdmin,
  } = provider.getUser();
  const customerName = provider.getCustomerName();

  return (
    <C.Main>
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

      <C.Top>
        <C.Logo>
          <IconAsurget />
        </C.Logo>
        <CreateList
          shouldShow={isAdmin}
          createList={provider.getCreateList()}
          translations={provider.getMenuTranslations()}
        />
        <CurrentUser
          name={name}
          email={email}
          imageLink={imageLink}
          customerName={customerName}
        >
          {({ onClose, isOpen }) => (
            <DropdownMenu
              name={name}
              email={email}
              customerName={customerName}
              imageLink={imageLink}
              onClose={onClose}
              isOpen={isOpen}
              languages={languages}
              navigationList={navigation}
              onNavigate={onClose}
              selectedLanguage={selectedLanguage}
              translations={provider.getMenuTranslations()}
              onChangeLanguage={provider.onChangeLanguage}
              onLogout={provider.onLogout}
            />
          )}
        </CurrentUser>
      </C.Top>
    </C.Main>
  );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;
Layout.displayName = '@asurgent.ui.layout.Main';

export default Layout;
