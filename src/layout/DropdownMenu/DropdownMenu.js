import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Icon from '@material-ui/icons';
import * as U from './DropdownMenu.styled';
import * as UserImage from '../../UserImage';
import * as Button from '../../Button';
import * as Form from '../../Form';
import * as Shield from '../../Shield';
import Navigation from '../Navigation';

const MENU_TAB = 'menu_tab';
const SETTINGS_TAB = 'settings_tab';

const propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  imageLink: PropTypes.string,
  navigationList: PropTypes.instanceOf(Array).isRequired,
  languages: PropTypes.instanceOf(Array).isRequired,
  selectedLanguage: PropTypes.string.isRequired,
  onChangeLanguage: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  translations: PropTypes.instanceOf(Object),
};

const defaultProps = {
  translations: {},
  onClose: (() => {}),
  imageLink: '',
};

const DropdownMenu = ({
  name,
  email,
  imageLink,
  languages,
  navigationList,
  selectedLanguage,
  onChangeLanguage,
  translations,
  onLogout,
  onClose,
  onNavigate,
}) => {
  const [mobileMenuTab, setMobileMenuTab] = useState(MENU_TAB);


  const langaugeForm = Form.useFormBuilder({
    selectLanguage: {
      type: 'select',
      label: (translations.languageSelector || 'Language'),
      options: languages,
    },
  });

  useEffect(() => {
    langaugeForm.updateField('selectLanguage', { options: languages });
  }, [selectedLanguage]);

  return (
    <Shield.Dark onClick={onClose}>
      <U.MenuWrapper>
        <U.Desktop>
          <U.DesktopMenu>
            <b>{name}</b>
            <p>{email}</p>
            <Form.Primary
              form={langaugeForm}
              onNewValue={(values) => {
                onChangeLanguage(values.selectLanguage);
              }}
            />
            <U.DesktopMenuFooter>
              <Button.Transparent onClick={onLogout}>
                <Icon.ExitToApp className="exit-icon" fontSize="large" />
                {' '}
                {translations.logout || 'Sign out'}
              </Button.Transparent>
            </U.DesktopMenuFooter>
          </U.DesktopMenu>
        </U.Desktop>

        <U.Mobile>
          <U.MobileMenu>
            <Button.Icon className="close" onClick={onClose} icon={<Icon.Close fontSize="large" />} />
            <div className="user">
              <UserImage.Circle
                size="10rem"
                name={name}
                email={email}
                href={imageLink}
              />
              <b>{name}</b>
              <p>{email}</p>
              <Button.Transparent onClick={onLogout}>
                <Icon.ExitToApp className="exit-icon" fontSize="large" />
                {' '}
                {translations.logout || 'Sign out'}
              </Button.Transparent>
            </div>

            { mobileMenuTab === MENU_TAB && (
              <>
                <div className="menu">
                  {Array.isArray(navigationList) && (
                    <Navigation
                      withLabel
                      onNavigate={onNavigate}
                      theme={(theme) => ({
                        activeBackground: theme.white,
                        activeLinkColor: theme.blue700,
                        linkColor: theme.gray800,
                        menuItemsSpacing: '.8rem',
                        menuFontSize: '2.2rem',
                      })}
                      navigationList={navigationList}
                    />
                  )}
                </div>
              </>
            )}

            { mobileMenuTab === SETTINGS_TAB && (
              <div className="menu">
                <Form.Primary
                  form={langaugeForm}
                  onNewValue={(values) => {
                    onChangeLanguage(values.selectLanguage);
                  }}
                />
              </div>
            )}

            <U.Tabs>
              <U.TabButton active={mobileMenuTab === MENU_TAB} onClick={() => setMobileMenuTab(MENU_TAB)}>
                {translations.menu || 'Menu'}
              </U.TabButton>
              <U.TabButton active={mobileMenuTab === SETTINGS_TAB} onClick={() => setMobileMenuTab(SETTINGS_TAB)}>
                {translations.settings || 'Settings'}
              </U.TabButton>
            </U.Tabs>
          </U.MobileMenu>
        </U.Mobile>
      </U.MenuWrapper>
    </Shield.Dark>

  );
};

DropdownMenu.propTypes = propTypes;
DropdownMenu.defaultProps = defaultProps;

export default DropdownMenu;
