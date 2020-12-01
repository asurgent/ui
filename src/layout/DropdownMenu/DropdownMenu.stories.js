import React from 'react';
import {
  withKnobs, boolean,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import {
  Dashboard, Explore, Comment, LibraryBooks,
} from '@material-ui/icons';
import DropdownMenu from './index';

export const dropdownMenu = () => (
  <div style={{ height: '100vh' }}>
    <p>Try in mobile view</p>

    <DropdownMenu
      isOpen={boolean('open', false)}
      selectedLanguage="sv"
      navigationList={[
        {
          label: 'Dashbaord',
          tooltip: 'Dashboard',
          icon: (<Dashboard fontSize="large" />),
          link: '/',
        },
        {
          label: 'Explore', tooltip: 'Explore Environment', icon: (<Explore fontSize="large" />), link: '/',
        },
        {
          label: 'Tickets', tooltip: 'View tickets', icon: (<TicketIcon fontSize="large" />), link: '/',
        },
        {
          label: 'Documentation', tooltip: 'Documentation', icon: (<LibraryBooks fontSize="large" />), link: '/',
        },
      ]}
      translations={{
        languageSelector: 'Språk',
        logout: 'Logga ut',
        menu: 'Meny',
        settings: 'Inställningar',
      }}
      languages={[{ value: 'en', label: 'English' }, { value: 'sv', label: 'Swedish' }]}
      name="Kalle Anka"
      customerName="Google"
      email="test@mail.com"
      onNavigate={action('on navigate')}
      onChangeLanguage={(lang) => action('Changed language')(lang)}
      onLogout={action('logout action')}
    />
  </div>
);

export default {
  title: 'Layout|Dropdown Menu',
  decorators: [withKnobs],
};
