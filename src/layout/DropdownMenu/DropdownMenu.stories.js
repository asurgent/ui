import React from 'react';
import MdiIcon from '@mdi/react';
import {
  mdiCompass,
  mdiViewDashboard,
  mdiAndroidMessages,
  mdiBookOpenVariant,
} from '@mdi/js';
import DropdownMenu from './index';

const Story = {
  title: 'Layout/Dropdown menu',
  component: DropdownMenu,
  argTypes: {},
};
export default Story;


const DropdownMenuTemplate = (args) => (
  <div style={{ height: '100vh' }}>
    <p>Try in mobile view</p>

    <DropdownMenu
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
      onNavigate={() => console.log('on navigate')}
      onChangeLanguage={(lang) => console.log('Changed language', lang)}
      onLogout={() => console.log('logout action')}
      {...args}
    />
  </div>
);

export const DropDownMenu = DropdownMenuTemplate.bind({});
DropDownMenu.args = {
  isOpen: false,
  name: "Kalle Anka",
  customerName: "Google",
  email: "test@mail.com"
}