import React from 'react';
import {
  withKnobs, boolean,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import MdiIcon from '@mdi/react';
import {
  mdiCompass,
  mdiViewDashboard,
  mdiAndroidMessages,
  mdiBookOpenVariant,
} from '@mdi/js';
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
          icon: (<MdiIcon path={mdiViewDashboard} size={1.4} />),
          link: '/',
        },
        {
          label: 'Explore', tooltip: 'Explore Environment', icon: (<MdiIcon path={mdiCompass} size={1.4} />), link: '/',
        },
        {
          label: 'Tickets', tooltip: 'View tickets', icon: (<MdiIcon path={mdiAndroidMessages} size={1.4} />), link: '/',
        },
        {
          label: 'Documentation', tooltip: 'Documentation', icon: (<MdiIcon path={mdiBookOpenVariant} size={1.4} />), link: '/',
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
