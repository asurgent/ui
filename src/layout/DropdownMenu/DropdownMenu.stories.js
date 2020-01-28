import React from 'react';
import {
  withKnobs, boolean, text, number,
} from '@storybook/addon-knobs';
import {
  Dashboard, Explore, Comment, LibraryBooks,
} from '@material-ui/icons';
import DropdownMenu from './index';

export const dropdownMenu = () => (
  <div style={{ height: '100vh' }}>
    <p>Try in mobile view</p>

    <DropdownMenu
      selectedLanguage="sv"
      navigationList={[
        {
          label: 'Dashbaord', tooltip: 'Dashboard', active: true, icon: (<Dashboard fontSize="large" />),
        },
        { label: 'Explore', tooltip: 'Explore Environment', icon: (<Explore fontSize="large" />) },
        { label: 'Tickets', tooltip: 'View tickets', icon: (<Comment fontSize="large" />) },
        { label: 'Documentation', tooltip: 'Documentation', icon: (<LibraryBooks fontSize="large" />) },
      ]}
      translations={{
        languageSelector: 'Språk',
        logout: 'Logga ut',
        menu: 'Meny',
        settings: 'Inställningar',
      }}
      languages={[{ value: 'en', label: 'English' }, { value: 'sv', label: 'Swedish' }]}
      name="Kalle Anka"
      email="test@mail.com"
      onChangeLanguage={(lang) => console.log(lang)}
      onLogout={() => console.log('logout action')}
    />
  </div>
);

export default {
  title: 'Layout|Dropdown Menu',
  decorators: [withKnobs],
};
