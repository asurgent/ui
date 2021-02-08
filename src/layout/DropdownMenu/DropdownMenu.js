import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MdiIcon from '@mdi/react';
import { mdiExitToApp, mdiClose } from '@mdi/js';
import * as U from './DropdownMenu.styled';
import * as UserImage from '../../UserImage';
import * as Button from '../../Button';
import * as Form from '../../Form';
import * as Shield from '../../Shield';
import Navigation from '../Navigation';
import * as Transition from '../../Transition';
import translation from './DropdownMenu.translation';

const MENU_TAB = 'menu_tab';
const SETTINGS_TAB = 'settings_tab';

const propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  customerName: PropTypes.string.isRequired,
  imageLink: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  navigationList: PropTypes.instanceOf(Array).isRequired,
  languages: PropTypes.instanceOf(Array).isRequired,
  selectedLanguage: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onChangeLanguage: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

const defaultProps = {
  onClose: (() => {}),
  imageLink: '',
};

const DropdownMenu = ({
  name,
  email,
  imageLink,
  customerName,
  languages,
  navigationList,
  selectedLanguage,
  onChangeLanguage,
  onLogout,
  onClose,
  onNavigate,
  isOpen,
}) => {
  const { t } = translation;
  const [mobileMenuTab, setMobileMenuTab] = useState(MENU_TAB);

  const langaugeForm = Form.useFormBuilder({
    selectLanguage: {
      type: 'select',
      label: t('languageSelector', 'asurgentui'),
      value: selectedLanguage,
      options: languages,
      noLabel: true,
    },
  });

  return (
    <Shield.Transparent onClick={onClose} shieldIsUp={isOpen}>
      <U.MenuWrapper>
        <U.Desktop>
          <Transition.FadeInSlideDown isVisible={isOpen} timeout={80}>
            <U.DesktopMenu>
              <div className="user-details">
                <b>{name}</b>
                <small>{email}</small>
                <small>{customerName}</small>
              </div>
              <Form.Primary
                form={langaugeForm}
                onChangeTimer={({ values }) => {
                  onChangeLanguage(values.selectLanguage);
                }}
              />
              <U.DesktopMenuFooter>
                <Button.Plain onClick={onLogout}>
                  <U.CreateItem>
                    <MdiIcon size={1.4} path={mdiExitToApp} className="exit-icon" />
                    <U.CreateTitle>{t('logout', 'asurgentui')}</U.CreateTitle>
                  </U.CreateItem>
                </Button.Plain>
              </U.DesktopMenuFooter>
            </U.DesktopMenu>
          </Transition.FadeInSlideDown>
        </U.Desktop>

        <U.Mobile>
          <Transition.FadeIn isVisible={isOpen} timeout={80}>
            <U.MobileMenu>
              <Button.Icon
                className="close"
                onClick={onClose}
                icon={<MdiIcon size={1.4} path={mdiClose} />}
              />
              <div className="user">
                <UserImage.Circle
                  size="6rem"
                  name={name}
                  email={email}
                  href={imageLink}
                />
                <div className="meta">
                  <b>{name}</b>
                  <small>{email}</small>
                  <small>{customerName}</small>
                </div>
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
                    <div className="wrapper">
                      <Button.Plain onClick={onLogout}>
                        <U.CreateItem>
                          <MdiIcon size={1.4} path={mdiExitToApp} className="exit-icon" />
                          <U.CreateTitle>{t('logout', 'asurgentui')}</U.CreateTitle>
                        </U.CreateItem>
                      </Button.Plain>
                    </div>
                  </div>
                </>
              )}

              { mobileMenuTab === SETTINGS_TAB && (
                <div className="menu">
                  <Form.Primary
                    form={langaugeForm}
                    onChangeTimer={({ values }) => {
                      onChangeLanguage(values.selectLanguage);
                    }}
                  />
                </div>
              )}

              <U.Tabs>
                <U.TabButton
                  active={mobileMenuTab === MENU_TAB}
                  onClick={() => setMobileMenuTab(MENU_TAB)}
                >
                  {t('menu', 'asurgentui')}
                </U.TabButton>
                <U.TabButton
                  active={mobileMenuTab === SETTINGS_TAB}
                  onClick={() => setMobileMenuTab(SETTINGS_TAB)}
                >
                  {t('settings', 'asurgentui')}
                </U.TabButton>
              </U.Tabs>
            </U.MobileMenu>
          </Transition.FadeIn>
        </U.Mobile>
      </U.MenuWrapper>
    </Shield.Transparent>
  );
};

DropdownMenu.propTypes = propTypes;
DropdownMenu.defaultProps = defaultProps;
DropdownMenu.displayName = '@asurgent.ui.layout.DropdownMenu';

export default DropdownMenu;
